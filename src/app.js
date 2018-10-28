import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

require("babel-core/register");
require("babel-polyfill");

import AppRouter from './routers/AppRouter';
import configureStore from "./store/configureStore";

import 'normalize.css/normalize.css';
import './styles/styles.scss';


const store = configureStore();

store.subscribe(() => {
	const state = store.getState();

	console.log(state);
});

const jsx = (
	<Provider store={store}>
		<AppRouter/>
	</Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));