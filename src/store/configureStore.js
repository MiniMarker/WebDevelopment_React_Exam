import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
	auth: authReducer
});

export default () => {
	return createStore(reducers,
		composeEnhancers(applyMiddleware(thunkMiddleware))
	);
};
