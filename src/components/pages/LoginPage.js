import React from 'react';
import {Link} from 'react-router-dom';
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

	onInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	handleLogin = async (event) => {

		event.preventDefault();

		const {username, password} = this.state;
		const url = "/api/login";
		const payload = { username: username, password: password };

		await fetch(url, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		}).then((res, err) => {

			if(err) {
				this.setState({ errorMsg: `Error on request: ${err}` });
				return;
			}

			switch(res.status) {

				case 401:
					this.setState({ errorMsg: "Invalid userId/password" });
					return;

				case 204:
					this.setState({ errorMsg: null });
					this.props.history.push("/");
					return;

				default:
					this.setState({ errorMsg: `Unsuspected status code: ${res.status.valueOf()}` });
					return;
			}

		}).catch((e) => {
			this.setState({ errorMsg: "Failed to connect to server: " + e });

		});
	};

	// ############## RENDER FUNCTIONS ##############
	render() {
		return (
			<div className={"container"}>

				<form className={"auth_form"} onSubmit={this.handleLogin}>

					{this.state.errorMsg &&
						<div className={"errorMsg"}>
							<p className={"errorMsg__text"}>{this.state.errorMsg}</p>
						</div>}

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
					<button>Login</button>
					<Link className={"auth_link"} to={"/signup"}>Sign up here!</Link>
				</form>
			</div>
		);
	}
}

// ############## REDUX FUNCTIONS ##############
const mapDispatchToProp = (dispatch) => {
	return {
		login: (username) => dispatch(login(username))
	}
};

export default connect(undefined, mapDispatchToProp)(LoginPage);