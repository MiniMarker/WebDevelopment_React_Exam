import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import AppRouter from './routers/AppRouter';
import configureStore from "./store/configureStore";

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import {createDefaultQuizzes} from "../server/entities/DefaultData";
import {getAllQuizzes, getRandomQuiz} from "../server/entities/Quiz";

require("babel-core/register");
require("babel-polyfill");

const store = configureStore();

createDefaultQuizzes();

console.log(getAllQuizzes());

const jsx = (
	<Provider store={store}>
		<AppRouter/>
	</Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));