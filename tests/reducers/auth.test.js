import authReducer from "../../src/reducers/auth"

test("SignupSaveUsername", () => {
	const username = "Frodo";

	const state = authReducer(undefined, {
		type: "SIGNUP",
		username
	});

	expect(state).toEqual({
		username
	})
});

test("LoginSaveUsername", () => {
    const username = "Frodo";

    const state = authReducer(undefined, {
    	type: "LOGIN",
	    username
    });

    expect(state).toEqual({
	    username
    })
});

test("LogoutWipeSavedUsername", () => {
	const state = authReducer({
		username: "Frodo"
	}, {
		type: "LOGOUT"
	});

	expect(state).toEqual({})
});