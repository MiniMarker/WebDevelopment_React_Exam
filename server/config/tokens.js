const crypto = require("crypto");

//fake the DB
const tokens = new Map();

const getRandomId = () => {
	
	return crypto.randomBytes(10).toString("hex");
};

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