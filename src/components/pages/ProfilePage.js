import React from 'react'
import {connect} from "react-redux";
import {logout} from "../../actions/auth";

class ProfilePage extends React.Component {
	constructor(props) {
		super(props);
	}

	handleLogout = async () => {
		const url = "/api/logout";

		let response;

		try {
			response = await fetch(url, { method: "post" });
		} catch (err) {
			alert("Failed to connect to server: " + err);
			return;
		}

		if (response.status !== 204) {
			alert("Error when connecting to server: status code " + response.status);
			return;
		}

		console.log("Logout success");

		this.props.logout();
		this.props.history.push("/");
	};

	render() {
		return (
			<div>
				<h1>ProfilePage</h1>
				<button onClick={this.handleLogout}>Log out</button>
			</div>
		);
	}
}

const mapDispatchToProp = (dispatch) => {
	return {
		logout: () => dispatch(logout())
	}
};


export default connect(undefined, mapDispatchToProp)(ProfilePage);