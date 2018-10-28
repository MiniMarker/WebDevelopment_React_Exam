
const authDefaultState = {};

export default (state = authDefaultState, action) => {

	switch(action.type) {

		case "LOGIN":
			return {
				username: action.username
			};

		case "LOGOUT":
			return {};

		case "SIGNUP":
			return {
				username: action.username
			};


		default:
			return state;

	};
};