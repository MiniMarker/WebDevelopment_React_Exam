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

	for(let user of queue) {
		if(user.username === username) {
			console.log(user);
			return true;
		}
	}

	return false;
};

/**
 * Get all users in the queue
 * @returns {Array}
 */
const getAllUsersInQueue = () => {

	return queue;
};

/**
 * Take all users (FIFO) from the queue
 * @returns {Array} Array of all users that were taken from the queue
 */
const takeAllUsersInQueue = () => {

	if(queue.length <= 1) {
		console.log("Queue length <= 1");
		return null;
	}

	let users = [];

	while((user = queue.shift()) !== undefined) {
		users.push(user)
	}

	return users;
};


module.exports = {addUser, size, getAllUsersInQueue, hasUser, takeAllUsersInQueue};