import React from 'react';

class LoginPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			errorMsg: null
		};

		this.doLogIn = this.doLogIn.bind(this);
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

	doLogIn = async () => {
		const { username, password } = this.state;

		const url = "/api/login";

		const payload = { username: username, password: password };

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

		console.log(response);

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

		this.setState({ errorMsg: null });
		this.props.history.push("/");

	}


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
				<div className={"loginBtn"} onClick={this.doLogIn}>Login</div>
			</div>
		);
	}
}

export default LoginPage;