import React from 'react';
import openSocket from 'socket.io-client';
import {connect} from "react-redux";
import {login, logout} from "../../actions/auth";
import {Quiz} from "./Quiz";

class LobbyGamePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = this.setDefaultState();
	}

	setDefaultState = () => {

		console.log("State reset to default values");

		return {
			game: null,
			opponentIds: [],
			numberOfPlayers: null,
			errorMsg: null
		}
	};

	// ############## LIFECYCLE FUNCTIONS ##############
	componentDidMount = () => {
		//join or start game

		/*
		*  In this component i don't handle page refreshes for keeping frontend login state
		* */

		const username = this.props.auth.username;

		if(username === null) {
			this.setState({errorMsg: "You have to login before entering a game"});
			this.props.history.push("/login");
			return;
		}

		this.setupWsSockets();

		this.doLoginWebSocket().then(
			this.joinGame
		);
	};

	componentWillUnmount() {

		if(this.state.game !== null) {
			this.socket.emit("userLeftGame", (this.state.game.id));
		}

		this.socket.disconnect();
	}


	setupWsSockets = () => {
		// Open the socket
		this.socket = openSocket(window.location.origin);


		//Subscribe to emits from "update"
		this.socket.on("update", (dto) => {

			if(dto === null || dto === undefined) {
				this.setState({errorMsg: "Invalid response from server."});
				return;
			}

			if(dto.error !== null && dto.error !== undefined) {
				this.setState({errorMsg: dto.error});
				return;
			}

			console.log(dto.data);
		});

		this.socket.on("renderGame", (data) => {

			this.setState({
				game: data.game,
				errorMsg: data.errorMsg
			});
		});

		this.socket.on("updateNumberOfPlayers", (data) => {
			this.setState({
				numberOfPlayers: data
			})
		});

		//Subscribe to emits from "disconnect"
		this.socket.on("disconnect", () => {
			this.setState({errorMsg: "Disconnected from Server."});
		});

		//Subscribe to emits from "login"
		this.socket.on("login", () => {
			this.setState({errorMsg: "Connected to Server."});
		});
	};

	doLoginWebSocket = async() => {

		let response = await fetch("/api/wstoken", {method: "post"});

		await response.json()
			.then((data) => {
				this.socket.emit("login", data);
			})
			.catch((e) => {
				console.error("Error on parse to JSON", e);
			});
	};


	joinGame = () => {
		let data = {
			username: this.props.auth.username
		};

		this.socket.emit("joinGame", (data));
	};


	startGame = () => {

		this.socket.emit("startGame");
	};

	// ############## RENDER FUNCTIONS ##############
	renderIdleText = () => (
		<div>
			<h3>Wait for people to join!</h3>

			{this.state.numberOfPlayers
				? <h3>{this.state.numberOfPlayers} people has joined the game</h3>
				: <h3>x people has joined the game</h3>}

			<img src={"images/loader.gif"}/>

			<br/>

			<button onClick={this.startGame}>Start game!</button>
		</div>
	);

	renderGuest = () => (
		<h3>Why are you even seeing this?! you should've been redirected to login by now........</h3>
	);

	render() {
		return (
			<div className={"container"}>

				<p>{this.state.errorMsg}</p>
				<br/><br/>

				{this.props.auth.username
					? this.state.game
						? <Quiz
							game={this.state.game}
							socket={this.socket}
							authUser={this.props.auth.username}
						/>
						: this.renderIdleText()
					: this.renderGuest()
				}
			</div>
		);
	}
}

// ############## REDUX FUNCTIONS ##############
const mapStateToProps = (state) => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProp = (dispatch) => {
	return {
		login: (username) => dispatch(login(username)),
		logout: () => dispatch(logout())
	}
};

export default connect(mapStateToProps, mapDispatchToProp)(LobbyGamePage);