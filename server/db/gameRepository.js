const uuid = require('uuid');

//TODO use Map of entity object
let games = new Map();

// CRUD

const createGame = (gameName) => {

	const game = {
		id: uuid(),
		name: gameName,
		players: [],
		questions: []
	};

	games.set(gameName, game);
	return game;
};

const getGameByName = (name) => {
	games.forEach((game) => {

		if(game.name === name) {
			return game;
		} else {
			return null
		}

	})
};

const getRandomGame = () => {
	const randomNum = Math.floor(Math.random() * games.size);

	let key = Array.from(games.keys())[randomNum];
	let randomQuiz = games.get(key);

	//console.log("getRandomGame >> ", randomQuiz);

	return randomQuiz;
};

const getAllPlayersInGame = (game) => {

	if(games.get(gameId) === undefined || games.get(gameId) === null) {
		return null;
	}

	return games.get(gameId).players

};

const getAllGames = () => {

	return Array.from(games);

};

const getGame = (id) => {

	return games.get(id);
};

const deleteGame = (id) => {
	games.delete(id)
};

const updateGame = (id, updatedValues) => {

	if(getGame(id) === null) {
		return null;
	}

	if(updatedValues.id !== undefined ||
		updatedValues.name === undefined) {
		return null;
	}

	let oldGame = getGame(id);

	oldGame.name = updatedValues.name;
};

const addPlayerToGame = (game, username) => {

	if(getGame(game) === null) {
		console.log("Could not find game", game);
		return false;
	}

	game.players.push(username);
	return true;
};

// QUESTIONS

const createQuestion = (game, question, ans1, ans2, ans3, ans4, correctAnsIndex) => {

	const input = {
		question,
		answers: [
			ans1, ans2, ans3, ans4
		],
		correctAnsIndex
	};

	game.questions.push(input);
};

const getAllQuestions = (game) => {
	return game.questions;
};

const getQuestion = (id) => {
	return games.get(id);
};

const getRandomQuestion = (game) => {

	const randomNum = Math.floor(Math.random() * game.questions.size);

	return game.questions[randomNum]
};

module.exports = {
	createGame,
	getAllGames,
	getGame,
	updateGame,
	getRandomGame,
	addPlayerToGame,
	deleteGame,
	getGameByName,
	createQuestion,
	getAllQuestions,
	getQuestion,
	getRandomQuestion
};