import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from "../components/Header";
import HomePage from '../components/pages/HomePage'
import NotFoundPage from "../components/pages/NotFoundPage";
import ProfilePage from "../components/pages/ProfilePage";
import LoginPage from "../components/pages/LoginPage";
import SignupPage from "../components/pages/SignupPage";

const AppRouter = () => (
	<BrowserRouter>
		<div>
			<Header/>
			<Switch>
				<Route path="/" component={HomePage} exact={true}/>
				<Route path="/profile" component={ProfilePage}/>
				<Route path="/login" component={LoginPage}/>
				<Route path="/signup" component={SignupPage}/>
				<Route component={NotFoundPage}/>

			</Switch>
		</div>
	</BrowserRouter>
);

export default AppRouter;