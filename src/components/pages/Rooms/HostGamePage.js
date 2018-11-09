import React from 'react';
import Game from '../../../../server/entities/Game';
import {login} from "../../../actions/auth";
import connect from "react-redux/es/connect/connect";

export class HostGamePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: ""
		}
	}

	// ############## LIFECYCLE FUNCTIONS ##############
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

		console.log("entered handleCreateGame");
		Game.createGame(this.state.name, this.props.auth.username);

		this.props.history.push("/game");
	};

	// ############## RENDER FUNCTIONS ##############
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

// ############## REDUX FUNCTIONS ##############
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


export default connect(mapStateToProps, mapDispatchToProp)(HostGamePage);