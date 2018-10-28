import React from 'react';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';

export class Header extends React.Component {

	constructor(state) {
		super(state)
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
							: <div>
								<a className={"header__link"}
								   href={this.handleLogout}>Logout</a>
							</div>
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

export default connect(mapStateToProps, null, null, {pure: false})(Header);