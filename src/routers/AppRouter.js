import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { sessionService } from 'redux-react-session';

import Header from "../components/Header";
import HomePage from '../components/pages/HomePage'
import NotFoundPage from "../components/pages/NotFoundPage";
import ProfilePage from "../components/pages/ProfilePage";
import LoginPage from "../components/pages/LoginPage";
import SignupPage from "../components/pages/SignupPage";

//TODO make this class based and fetch /api/user component did mount

class AppRouter extends React.Component {

	render() {
		return (
			<BrowserRouter>
				<div>
					<Header/>
					<Switch>
						<Route
							path="/"
							component={HomePage}
							checkAuthStatusFunc={this.checkAuthStatus}
							exact={true}/>

						<Route
							path="/profile"
							component={ProfilePage}/>
							checkAuthStatusFunc={this.checkAuthStatus}
						<Route
							path="/login"
							component={LoginPage}
							checkAuthStatusFunc={this.checkAuthStatus}/>

						<Route
							path="/signup"
							component={SignupPage}
							checkAuthStatusFunc={this.checkAuthStatus}/>

						<Route component={NotFoundPage}/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}

}

export default AppRouter;