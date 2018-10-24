import React from 'react';
import ReactDOM from 'react-dom';
require("babel-core/register");
require("babel-polyfill");

import AppRouter from './routers/AppRouter';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(<AppRouter/>, document.getElementById("app"));