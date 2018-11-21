const uuid = require('uuid');
const gameRepository = require("./gameRepository");

let ongoingGames = new Map();

const startGame = () => {

	let game = {};

	game.id = uuid();
	game.players = [];

	Object.assign(game, gameRepository.getRandomGame());

	ongoingGames.set(game.id, game);

	return game;
};

const addPlayerToGame = (gameId, username) => {

	let requestedGame = ongoingGames.get(gameId);

	if(requestedGame !== undefined) {
		requestedGame.players.push({username, score: 0});
		return true;
	} else {
		return false;
	}
};

const updateTimeScore = (gameId, username, timestamp) => {

	let game = ongoingGames.get(gameId);

	let player = game.players.find(player => player.username === username);
	player.score += timestamp;
};

const getOngoingGame = (gameId) => {
	return ongoingGames.get(gameId) ;
};

const getPlayersInOngoingGame = (gameId) => {

	if (ongoingGames.get(gameId) === undefined) {
		return;
	} else {
		return ongoingGames.get(gameId).players
			.sort((a, b) => {
				return a.score - b.score
			});
	}
};

const endGame = (gameId) => {

	if(getOngoingGame(gameId) !== undefined) {
		ongoingGames.delete(gameId);
		console.log(`Game with id: ${gameId} DELETED`);
	}

};

module.exports = {startGame, getOngoingGame, getPlayersInOngoingGame, addPlayerToGame, updateTimeScore, endGame};