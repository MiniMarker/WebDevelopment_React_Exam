import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
	<header>
		<h1>Exam-Application Header</h1>
		<NavLink to={"/"} activeClassName={"header-link-is-active"} exact={true}>Dashboard</NavLink>
		<NavLink to={"/profile"} activeClassName={"header-link-is-active"}>Profile</NavLink>

	</header>
);

export default Header;