import React from 'react';
import {connect} from "react-redux";
import {login} from "../../actions/auth";

export class LoginPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			errorMsg: null
		};
	};

	onUsernameChange = (event) => {
		this.setState({
			username: event.target.value
		})
	};

	onPasswordChange = (event) => {
		this.setState({
			password: event.target.value
		})
	};

	handleLogin = async (event) => {

		event.preventDefault();

		const {username, password} = this.state;
		const url = "/api/login";
		const payload = {username: username, password: password};

		let response;

		try {
			response = await fetch(url, {
				method: "post",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(payload)
			});
		} catch (err) {
			this.setState({ errorMsg: "Failed to connect to server: " + err });
			return;
		}

		if (response.status === 401) {
			this.setState({ errorMsg: "Invalid userId/password" });
			return;
		}

		if (response.status !== 204) {
			this.setState({
				errorMsg:
					"Error when connecting to server: status code " + response.status
			});
			return;
		}

		this.props.login(username);
		this.setState({ errorMsg: null });
		this.props.history.push("/");

	};


	render() {
		return (
			<div className={"container"}>
				<form className={"auth_form"} onSubmit={this.handleLogin}>
					<input
						type={"text"}
						onChange={this.onUsernameChange}
						placeholder={"Username"}
					/>
					<input
						type={"text"}
						onChange={this.onPasswordChange}
						placeholder={"Password"}
					/>
					<button>Login</button>
				</form>
			</div>
		);
	}
}

const mapDispatchToProp = (dispatch) => {
	return {
		login: (username) => dispatch(login(username))
	}
};

export default connect(undefined, mapDispatchToProp)(LoginPage);