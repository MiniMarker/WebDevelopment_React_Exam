/*
    This code is copy/pasted from this file with minor changes, like converting all funcs to ES6 arraow functions:
    https://github.com/arcuri82/pg6300/blob/master/les11/connect4-v2/src/server/online/player_queue.js
 */

const queue = [];

const addUser = (id) =>{

	if(queue.includes(id)){
		return false;
	}

	queue.push(id);
	return true;
};

const size = () => {
	return queue.length;
};

const hasUser = (id) => {
	return queue.includes(id);
};

const takeUser = () => {

	if(queue.length === 0){
		return null;
	}

	return queue.shift();
};

const takeMultipleUsers = (numberOfUsers) => {

	let users = [];

	for(let i = 0; i < numberOfUsers; i++) {
		users.push(queue.shift());
	}

	return users;

};


module.exports = {addUser, size, takeUser, hasUser, takeMultipleUsers};