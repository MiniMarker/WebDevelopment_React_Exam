import React from "react";
import openSocket from "socket.io-client";
import {login} from "../../actions/auth";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

class OnlineMatch extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		await fetch("/api/user").then((res) => {

			switch(res.status) {
				case 200:

					res.json()
						.then((parsedBody) => {
							this.props.login(parsedBody.username);


							this.socket = openSocket(window.location.origin)


						});

					break;
				case 401:

					this.props.history.push("/login");

					break;
				default:
					console.log("ERROR: unexpected statuscode!", res.status);
			}
		});
	}

	renderAuthenticatedUser() {
		return (
			<div>

			</div>
		);
	}

	renderGuest() {
		return (
			<h3>Why are you even seeing this?! you should've been redirected to login by now........</h3>
		);
	}

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

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProp = (dispatch) => {
	return {
		login: (username) => dispatch(login(username))
	}
};


export default connect(mapStateToProps, mapDispatchToProp)(OnlineMatch);