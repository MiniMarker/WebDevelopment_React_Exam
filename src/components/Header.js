import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
	<header>
		<h1>Exam-Application Header</h1>
		<NavLink to={"/"} activeClassName={"header-link-is-active"} exact={true}>Dashboard</NavLink>
		<NavLink to={"/profile"} activeClassName={"header-link-is-active"}>Profile</NavLink>
		<br/>
		<br/>
		<NavLink to={"/login"} activeClassName={"header-link-is-active"}>Login</NavLink>
		<NavLink to={"/signup"} activeClassName={"header-link-is-active"}>Signup</NavLink>
		<a onClick={async () => {
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

			//this.props.updateLoggedInUserId(null);
			this.props.history.push("/");
		}}>Logout</a>
	</header>
);

export default Header;