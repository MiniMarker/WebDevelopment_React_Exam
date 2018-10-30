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

		await fetch(url, {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload)
		}).then((res, err) => {

			if(err) {
				this.setState({
					errorMsg: `Error on request: ${err}`
				});
				return;
			}

			switch(res.status) {

				case 401:
					this.setState({ errorMsg: "Invalid userId/password" });
					return;

				case 204:
					this.props.login(username);
					this.setState({ errorMsg: null });
					this.props.history.push("/");
					return;

				default:
					this.setState({
						errorMsg: `Unsuspected status code: ${res.status.valueOf()}`
					});
					return;
			}

		}).catch((e) => {
			this.setState({ errorMsg: "Failed to connect to server: " + e });

		});
	};


	render() {
		return (
			<div className={"container"}>

				{this.state.errorMsg && <p>{this.state.errorMsg}</p>}

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