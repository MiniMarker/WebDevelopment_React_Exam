
export const login = (username) => ({
	type: "LOGIN",
	username
});

export const signup = (username) => ({
	type: "SIGNUP",
	username
});

export const logout = () => ({
	type: "LOGOUT"
});