import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import authReducer from '../reducers/auth';
import { sessionReducer } from 'redux-react-session';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
	auth: authReducer,
	session: sessionReducer
});

export default () => {
	return createStore(reducers,
		composeEnhancers(applyMiddleware(thunkMiddleware))
	);
};
