import React from 'react';
import openSocket from "socket.io-client";
import {createTokenForUser} from "../../../server/config/tokens";

export class HostGamePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: ""
		}
	}

	async componentDidMount() {
		await fetch("/api/user").then((res) => {

			switch(res.status) {
				case 200:

					res.json()
						.then((parsedBody) => {
							this.props.login(parsedBody.username);
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



	onInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	handleCreateGame = (event) => {
		event.preventDefault();

		this.props.history.push("/game");
	};

	render() {
		return (
			<div className={"container"} onSubmit={this.handleCreateGame}>
				<form className={"auth_form"}>
					<input
						name={"name"}
						type={"text"}
						onChange={this.onInputChange}
						placeholder={"Game name"}
					/>
					<button>Host game</button>
				</form>

			</div>
		);
	}
}