import {createStore} from "redux";

// Action Generators - functions that returns action obcjets

const incrementCount = ({incrementBy = 1} = {}) => ({
	type: "INCREMENT",
	incrementBy: incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
	type: "DECREMENT",
	decrementBy: decrementBy
});

const setCount = ({value} = {}) => ({
	type: "SET",
	count: value
});

const resetCount = () => ({
	type: "RESET"
});

// Reducer ##################################
// 1. Reducers are pure functions (output is determited by input)
// 2. never change state or action
//
const countReducer = (state = {count: 0}, action) => {
	switch (action.type) {
		case "INCREMENT":
			return {
				count: state.count + action.incrementBy
			};
		case "DECREMENT":
			return {
				count: state.count - decrementBy
			};

		case "SET": {
			return {
				count: action.count
			};
		}

		case "RESET":
			return {
				count: 0
			};

		default:
			return state;
	}
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
});

// Function calls ###############################################

store.dispatch(
	incrementCount({
		incrementBy: 5
	})
);

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(
	decrementCount({
		decrementBy: 10
	})
);

store.dispatch(decrementCount());

store.dispatch(
	setCount({
		value: 100
	})
);
