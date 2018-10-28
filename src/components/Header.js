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
	</header>
);

export default Header;