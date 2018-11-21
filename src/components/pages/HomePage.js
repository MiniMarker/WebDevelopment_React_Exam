import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {login} from "../../actions/auth";


export class HomePage extends React.Component {

	constructor(props) {
		super(props);
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
					break;
				default:
					console.log("ERROR: unexpected statuscode!", res.status);

			}
		})
	}

	// ############## RENDER FUNCTIONS ##############
	renderAuthenticatedUser() {
		return (

			<div>
				<h3>Hi {this.props.auth.username}!</h3>

				<p>This is a multiplayer Quiz game where you can play against a random component online</p>
				<p>In this game you will get a random category of questions.</p>
				<p>Each category has 8 questions, and you have 5 seconds to answer</p>
				<p>At the end of the round you will get a score between 0 and 100</p>
				<p>The best user will be announced as the winner</p>

				<h4>Have fun!</h4>

				<Link to={"/lobbygame"}>Lobby game</Link> <br/>
			</div>
		);
	}

	renderGuest() {
		return (
			<h3>No logged in user</h3>
		);
	}

	render() {
		return (
			<div className={"container"}>
				{this.props.auth.username
					? this.renderAuthenticatedUser()
					: this.renderGuest()
				}
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

export default connect(mapStateToProps, mapDispatchToProp)(HomePage);