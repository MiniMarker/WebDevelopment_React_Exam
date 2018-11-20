/*
* This code is inspired by Andrea Arcuri's course code for this course.
* I've made necessary changes to make this work with my solution
* https://github.com/arcuri82/pg6300/blob/master/les11/connect4-v2/src/server/online/ongoing_matches.js
* */

const Game = require("../game/Game");

const usernameToGame = new Map();
const gameIdToGame = new Map();

const startGame = (users) => {

	/*
	if(users.length < 2) {
		return null;
	}
	*/

	const game = new Game(users, deleteGame);

	users.forEach((username) => {
		usernameToGame.set(username, game);
	});

	gameIdToGame.set(game.gameId, game);

	game.start();

	return game;
};

const deleteGame = (gameId) => {

	const game = gameIdToGame.get(gameId);

	if(game === undefined) {
		return false;
	}

	game.players.forEach(username => usernameToGame.delete(username));
	gameIdToGame.delete(game.gameId);
};

//module.exports = {startGame};