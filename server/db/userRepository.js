
/*
    Here we "simulate" a database with in-memory Map.
    Furthermore, we do not deal with the "proper" handling of
    passwords. Passwords should NEVER be saved in plain text,
    but rather hashed with secure algorithms like BCrypt.
 */

//TODO use Map of entity object

//import {User} from "../entities/User";
//const users = new Map(Object.entries(User));
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
