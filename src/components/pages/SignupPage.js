import React from 'react';

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

	handleSignup = async () => {

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

		console.log("payload:", payload);
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

		console.log("SUCCESS!");

		this.setState({ errorMsg: null });
		this.props.history.push("/");

	};

	render() {
		return (
			<div>
				<div>
					<p>Username</p>
					<input
						type={"text"}
						onChange={this.onUsernameChange}
					/>
				</div>
				<div>
					<p>Password</p>
					<input
						type={"password"}
						onChange={this.onPasswordChange}
					/>
				</div>
				<div>
					<p>Confirm Password</p>
					<input
						type={"password"}
						onChange={this.onConfirmPasswordChange}
					/>
				</div>

				{this.state.errorMsg || <p>{this.state.errorMsg}</p>}

				<div className={"loginBtn"} onClick={this.handleSignup}>Login</div>
			</div>
		);
	}
}

export default SignupPage;