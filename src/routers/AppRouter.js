import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from "../components/Header";
import HomePage from '../components/pages/HomePage'
import NotFoundPage from "../components/pages/NotFoundPage";
import ProfilePage from "../components/pages/ProfilePage";
import LoginPage from "../components/pages/LoginPage";
import SignupPage from "../components/pages/SignupPage";
import OnlineMatch from "../components/pages/OnlineMatch";
import {HostGamePage} from "../components/pages/HostGamePage";
import JoinGamePage from "../components/pages/JoinGamePage";

//TODO make this class based and fetch /api/user component did mount

class AppRouter extends React.Component {

	render() {
		return (
			<BrowserRouter>
				<div>
					<Header/>
					<Switch>

						{/* General routes */}
						<Route
							path="/"
							component={HomePage}
							exact={true}/>

						<Route
							path="/profile"
							component={ProfilePage}/>

						{/* Auth routes */}
						<Route
							path="/login"
							component={LoginPage}/>

						<Route
							path="/signup"
							component={SignupPage}/>

						{/* Game routes */}
						<Route
							path="/host"
							component={HostGamePage}/>

						<Route
							path="/join"
							component={JoinGamePage}/>

						<Route
							path="/game"
							component={OnlineMatch}/>


						<Route component={NotFoundPage}/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default AppRouter;