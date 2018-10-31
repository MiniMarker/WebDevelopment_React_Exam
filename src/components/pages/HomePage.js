import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {login} from "../../actions/auth";


export class HomePage extends React.Component {

	constructor(props) {
		super(props);
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
					break;
				default:
					console.log("ERROR: unexpected statuscode!", res.status);

			}
		})
	}

	renderAuthenticatedUser() {
		return (

			<div>
				<h3>Hi {this.props.auth.username}!</h3>

				<p>This is a multiplayer Quiz game where you can play against a random component online</p>

				<Link to={"/host"}>Host a game</Link>
				<Link to={"/join"}>Join a game</Link>
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