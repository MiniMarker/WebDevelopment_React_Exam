import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from "../components/Header";
import DashboardPage from '../components/pages/DashboardPage'
import NotFoundPage from "../components/pages/NotFoundPage";
import ProfilePage from "../components/pages/ProfilePage";

const AppRouter = () => (
	<BrowserRouter>
		<div>
			<Header />
			<Switch>
				<Route path="/" component={DashboardPage} exact={true} />
				<Route path="/profile" component={ProfilePage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</BrowserRouter>
);

export default AppRouter;