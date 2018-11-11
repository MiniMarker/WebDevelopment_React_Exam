import React from "react";
import openSocket from 'socket.io-client';
import {login, logout} from "../../../actions/auth";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

class OnlineMatch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			matchId: null,
			opponentId: null,
			errorMsg: null
		};
	}

	// ############## LIFECYCLE FUNCTIONS ##############
	componentDidMount() {

		if(this.props.auth.username === null) {
			if(userId === null) {
				this.setState({errorMsg: "You should log in first"});
				this.props.history.push("/login");
				return;
			}
		}

		this.setupWsSockets();

		this.doLoginWebSocket().then(
			console.log("login")
		);
	};

	componentWillUnmount() {
		this.socket.disconnect();
		console.log("disconnecting socket");
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

			const data = dto.data;

			console.log(data);
		});

		//Subscribe to emits from "disconnect"
		this.socket.on("disconnect", () => {
			this.setState({errorMsg: "Disconnected from Server."});
		});

		//Subscribe to emits from "login"
		this.socket.on("login", () => {
			console.log("Logged in");
		});
	};

	async doLoginWebSocket() {

		console.log("entered doLoginWithWebsocket");

		let response = await fetch("/wstoken", {method: "post"});
		let parsedResponse = await response.json()
			.then((data) => {
					console.log("parsed respsonse", data);
					this.socket.emit("login", data);
					console.log("after socket emit");
			});

		/*
		await fetch("/wstoken", {method: "post"})
			.then((res) => {
				console.log(res.status);

				switch(res.status) {

					case 201:

						//res.json().then(data => console.log(data)).catch(e => console.error(e))

						console.log("Generated Token: ", res);
						this.socket.emit('login', res);

						return;

					case 401:
						this.setState({errorMsg: "You should log in first"});
						this.props.logOut();
						this.state.history.push("/login");
						return;

					default:
						this.setState({errorMsg: "Error when connecting to server: status code " + res.status});
						break;
				}
			}).catch((err) => {
				console.log(err);
			})
			*/
	}

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

export default connect(mapStateToProps, mapDispatchToProp)(OnlineMatch);