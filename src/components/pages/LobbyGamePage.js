import React from 'react';
import openSocket from 'socket.io-client';
import {connect} from "react-redux";
import {login, logout} from "../../actions/auth";

class LobbyGamePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			matchId: null,
			opponentIds: [],
			errorMsg: null
		};
	}

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
			this.startNewMatch
		);

	};

	componentWillUnmount() {
		this.socket.disconnect();
	}


	setupWsSockets = () => {
		// Open the socket
		this.socket = openSocket(window.location.origin);

		/*
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

			const data = dto.data;

			console.log(data);
		});
		*/

		//Subscribe to emits from "disconnect"
		this.socket.on("disconnect", () => {
			this.setState({errorMsg: "Disconnected from Server."});
		});

		//Subscribe to emits from "login"
		this.socket.on("login", (data) => {
			this.setState({errorMsg: "Connected to Server."});
		});
	};

	 doLoginWebSocket = async () => {

	 	//TODO make this promise based

		let response = await fetch("/api/wstoken", {method: "post"});

		await response.json()
			.then((data) => {
				this.socket.emit("login", data);
			})
			.catch((e) => {
				console.error("Error on parse to JSON", e);
			});

	};

	startNewMatch = async () => {
		fetch("/api/matches", {method: "post"})
			.then((res) => {

				if(res.status === 401) {
					this.setState({errorMsg: "You need to log in to join a game"});
					this.props.logout();
					this.props.history.push("/login");
					return;
				}

				if (res.status !== 201 && res.status !== 204) {
					this.setState({errorMsg: "Unexpected statuscode " + res.status});
					return;
				}
			})
			.catch((e) => {
				this.setState({errorMsg: "Error when connecting to server: status code " + e.status});
			});
	};

	// ############## RENDER FUNCTIONS ##############
	renderAuthenticatedUser = () => (
		<div>
			<h3>Wait for people to join!</h3>

			<h3>x people has joined the game</h3>

			<img src={"images/loader.gif"}/>

			<br/>

			{}

			<button>Start game!</button>

			<br/><br/>

			{this.state.errorMsg}
		</div>
	);

	renderGuest = () => (
		<h3>Why are you even seeing this?! you should've been redirected to login by now........</h3>
	);

	render() {
		return (
			<div className={"container"}>
				{this.props.auth.username
					? this.renderAuthenticatedUser()
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