import React from 'react';
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
							let jsonBody = parsedBody;

							this.props.login(parsedBody.username);

							console.log(jsonBody);
						});
					break;
				case 401:
					console.log("User not logged in", res.status);
					break;
				default:
					console.log("ERROR: unexpected statuscode!", res.status);

			}
		})
	}

	render() {
		return (
			<div className={"container"}>
				{this.props.auth.username
					? <h3>{this.props.auth.username}</h3>
					: <h3>No logged in user</h3>
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