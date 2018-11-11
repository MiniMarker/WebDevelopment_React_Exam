/*
* This code is taken from Andrea Arcuri's course code for this course.
* https://github.com/arcuri82/pg6300/blob/master/les11/connect4-v2/src/server/ws/tokens.js
* */

const crypto = require("crypto");

const tokens = new Map();

/**
 * Generate a random id consisting of 10 bytes represented as a Hexadecimal number
 * @returns {string} the random key
 */
const getRandomId = () => {
	
	return crypto.randomBytes(10).toString("hex");
};

/**
 * Generating a token and associate it to a user in the map
 * @param username
 * @returns {string}
 */
const createTokenForUser = (username) => {

	const tokenId = getRandomId();

	//associate the token with the player in the "DB"
	tokens.set(tokenId, username);

	return tokenId;
};

const consumeToken = (tokenId) => {

	const userId = tokens.get(tokenId);

	tokens.delete(tokenId);

	return userId;

};

module.exports = {createTokenForUser, consumeToken};