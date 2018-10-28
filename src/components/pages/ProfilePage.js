import React from 'react'
import {connect} from "react-redux";
import {logout} from "../../actions/auth";

class ProfilePage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={"container"}>
				<h1>ProfilePage</h1>

				{this.props.auth.username
					? <h3>{this.props.auth.username}</h3>
					: <h3>No logged in user</h3>
				}

				{this.props.auth.username &&
					<button onClick={this.handleLogout}>Log out</button>
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

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(logout())
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);