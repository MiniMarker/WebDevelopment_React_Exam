import React from 'react';
import {connect} from "react-redux";
import {signup} from "../../actions/auth";

class SignupPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			confirmPassword: "",
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

	onConfirmPasswordChange = (event) => {
		this.setState({
			confirmPassword: event.target.value
		})
	};

	handleSignup = async (event) => {

		event.preventDefault();

		const {username, password, confirmPassword} = this.state;

		if(confirmPassword !== password) {
			this.setState({
				errorMsg: "Passwords don't match"
			});
		}

		const url = "/api/signup";
		const payload = {
			username: username,
			password: password
		};

		let response;

		try {
			response = await fetch(url, {
				method: 'post',
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify(payload)
			});
		} catch(e) {
			this.setState({ errorMsg: "Failed to connect to server: " + e });
			return;
		}

		if (response.status === 400) {
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

		this.props.signup(username);
		this.setState({ errorMsg: null });
		this.props.history.push("/");

	};

	render() {
		return (
			<div className={"container"}>
				<form className={"auth_form"} onSubmit={this.handleSignup}>
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
					<input
						type={"text"}
						onChange={this.onConfirmPasswordChange}
						placeholder={"ConfirmPassword"}
					/>
					<button>Sign up</button>
				</form>
			</div>
		);
	}
}

const mapDispatchToProp = (dispatch) => {
	return {
		signup: (username) => dispatch(signup(username))
	}
};

export default connect(undefined, mapDispatchToProp)(SignupPage);