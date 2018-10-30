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

	onInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	handleSignup = async (event) => {

		event.preventDefault();

		const {username, password, confirmPassword} = this.state;

		if(confirmPassword !== password) {
			this.setState({
				errorMsg: "Passwords don't match"
			});
			return;
		}

		const url = "/api/signup";
		const payload = {
			username: username,
			password: password
		};

		await fetch(url, {
			method: 'post',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(payload)
		}).then((res, err) => {

			if(err) {
				this.setState({errorMsg: `Error on request: ${err}`});
				return;
			}

			switch(res.status) {
				case 400:
					this.setState({ errorMsg: "Invalid userId/password" });
					return;

				case 204:
					this.props.signup(username);
					this.setState({ errorMsg: null });
					this.props.history.push("/");
					return;

				default:
					this.setState({ errorMsg: `Unsuspected status code: ${res.status.valueOf()}`});
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

				<form className={"auth_form"} onSubmit={this.handleSignup}>
					<input
						name={"username"}
						type={"text"}
						onChange={this.onInputChange}
						placeholder={"Username"}
					/>
					<input
						name={"password"}
						type={"text"}
						onChange={this.onInputChange}
						placeholder={"Password"}
					/>
					<input
						name={"confirmPassword"}
						type={"text"}
						onChange={this.onInputChange}
						placeholder={"Confirm password"}
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