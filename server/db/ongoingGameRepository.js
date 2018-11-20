const uuid = require('uuid');
const gameRepository = require("./gameRepository");

let ongoingGames = new Map();

const startGame = () => {

	let randomGame = gameRepository.getRandomGame();

	randomGame.id = uuid();
	randomGame.players = [];

	ongoingGames.set(randomGame.id, randomGame);

	return randomGame;
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
	//console.log(`player: ${player.username}.score = `, player.score);
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

	console.log("Entered endGame in DB");

	if(getOngoingGame(gameId) !== undefined) {
		ongoingGames.delete(gameId);
		console.log("Game deleted");
	}

};

module.exports = {startGame, getOngoingGame, getPlayersInOngoingGame, addPlayerToGame, updateTimeScore, endGame};