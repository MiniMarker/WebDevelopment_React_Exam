import React from 'react';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import {logout} from "../actions/auth";

export class Header extends React.Component {

	constructor(state) {
		super(state)
	}

	handleLogout = async () => {
		const url = "/api/logout";

		await fetch(url, {
			method: "post"
		}).then((res, err) => {

			if(err) {
				this.setState({errorMsg: `Error on request: ${err}`});
				return;
			}

			switch(res.status) {

				case 204:
					console.log("Logout success");

					//TODO delete cookie in browser

					this.props.logout();
					this.props.history.push("/");
					return;

				default:
					this.setState({ errorMsg: `Unsuspected status code: ${res.status.valueOf()}`});
					return;

			}
		}).catch((e) => {
			this.setState({ errorMsg: "Failed to connect to server: " + e });
		});
	};

	render() {
		return (
			<div className={"header"}>
				<h1 className={"header__title"}>Quiz game</h1>

				<div className={"header__links"}>

					<NavLink
						to={"/"}
						className={"header__link"}
						activeClassName={"header__link-active"}
						exact={true}
					>Dashboard</NavLink>

					<NavLink
						to={"/profile"}
						className={"header__link"}
						activeClassName={"header__link-active"}
						exact={true}
					>Profile</NavLink>
					{
						!this.props.auth.username
							? <div className={"header__auth-links"}>
								<NavLink
									className={"header__link header__link-auth"}
									to={"/login"}
									activeClassName={"header__link-active"}
								>Login</NavLink>

								<NavLink
									className={"header__link"}
									to={"/signup"}
									activeClassName={"header__link-active"}
								>Signup</NavLink>
							</div>
							: <button onClick={this.handleLogout}>Log out</button>
					}
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Header);