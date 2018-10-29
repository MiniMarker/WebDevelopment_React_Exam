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

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	};
};


export default connect(mapStateToProps)(ProfilePage);