/*
* This code is inspired by Andrea Arcuri's course code for this course.
* I've made necessary changes to make this work with my solution
* https://github.com/arcuri82/pg6300/blob/master/les11/connect4-v2/src/server/online/ongoing_matches.js
* */

/**
 * The queue is represented by a Array that are treated as a data structure Queue
 * @type {Array}
 */
const queue = [];

/**
 * Add user to queue
 * @param username users username
 * @returns {boolean} status of the creation
 */
const addUser = (username) =>{

	if(queue.includes(username)){
		return false;
	}

	queue.push(username);
	return true;
};

/**
 * Get size of queue
 * @returns {number} size
 */
const size = () => {
	return queue.length;
};

/**
 * Check if user exist in the queue
 * @param username users username
 * @returns {boolean} status of the check
 */
const hasUser = (username) => {
	return queue.includes(username);
};

/**
 * Get all users in the queue
 * @returns {Array}
 */
const getAllUsersInQueue = () => {
	return queue;
};

/*
const takeUser = () => {

	if(queue.length === 0){
		return null;
	}

	return queue.shift();
};
*/

/*
const takeMultipleUsers = (numberOfUsers) => {

	let users = [];

	for(let i = 0; i < numberOfUsers; i++) {
		users.push(queue.shift());
	}

	return users;

};
*/

/**
 * Take all users (FIFO) from the queue
 * @returns {Array} Array of all users that were taken from the queue
 */
const takeAllUsersInQueue = () => {

	let users = [];

	while((user = queue.shift()) !== undefined) {
		users.push(user)
	}

	return users;
};


module.exports = {addUser, size, getAllUsersInQueue, hasUser, takeAllUsersInQueue};