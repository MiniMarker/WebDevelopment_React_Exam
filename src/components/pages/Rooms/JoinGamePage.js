import React from 'react';
import {Link} from 'react-router-dom';
import Game from '../../../../server/entities/Game';
import {login, logout} from "../../../actions/auth";
import connect from "react-redux/es/connect/connect";

class JoinGamePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			games: []
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

		this.getGames();

	}

	onInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	getGames = () => {

		this.setState({
			games: Game.getAllGames()
		});

		console.log(this.state.games);
	};

	handleJoinGame = (event) => {
		event.preventDefault();

		console.log("Entered handleJoinGame");
		Game.addPlayerToGame("name", this.props.auth.username);

		this.props.history.push("/game");
	};

	// ############## RENDER FUNCTIONS ##############
	render() {
		return (
			<div className={"game_list_container"} onSubmit={this.handleJoinGame}>
					{this.state.games.map((game) => {
						return <div className={"game_list_item"} key={game[1].id}>
								<h3>name: {game[0]}</h3>
								<button>Join</button>
							</div>
					})}
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
		login: (username) => dispatch(login(username)),
		logout: () => dispatch(logout())
	}
};

export default connect(mapStateToProps, mapDispatchToProp)(JoinGamePage);