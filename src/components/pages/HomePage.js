import React from 'react';
import {connect} from "react-redux";


export class HomePage extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			username: "",
			password: "",
			errorMessage: null
		};
	}

	render() {
		return (
			<div className={"container"}>
				<h1>HomePage</h1>

				{this.props.auth.username
					? <h3>Welcome {this.props.auth.username}!</h3>
					: <h3>Please log in</h3>
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

	}
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);