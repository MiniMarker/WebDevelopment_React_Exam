import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import { sessionService } from 'redux-react-session';

require("babel-core/register");
require("babel-polyfill");

import AppRouter from './routers/AppRouter';
import configureStore from "./store/configureStore";


import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

const options = { refreshOnCheckAuth: true, driver: 'COOKIES' };

sessionService.initSessionService(store, options)
	.then(() => {console.log("Redux React Session is ready and a session was refreshed from your storage");})
	.catch(() => {console.log("Redux React Session is ready and there is no session in your storage");});

const jsx = (
	<Provider store={store}>
		<AppRouter/>
	</Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));