/*
* This code is taken from Andrea Arcuri's course code for this course.
* */

const users = new Map();

function getUser(username){

	return users.get(username);
}

function verifyUser(username, password){

	const user = getUser(username);

	if(user === undefined){
		console.log(`User with username: ${username} doesn't exist`);
		return false;
	}

	return user.password === password;
}

function createUser(username, password){

	if(getUser(username) !== undefined ){
		console.log("User already exist");
		return false;
	}

	const user = {
		username: username,
		password: password
	};

	users.set(username, user);
	return user;
}
module.exports = {getUser, verifyUser, createUser};
