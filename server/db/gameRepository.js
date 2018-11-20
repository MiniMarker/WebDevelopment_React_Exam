const uuid = require('uuid');

//TODO use Map of entity object
let games = new Map();

// CRUD

/*
*   GAME
* */

const createGame = (gameName) => {

	const game = {
		id: null,
		name: gameName,
		players: [],
		questions: [],
		playersAnswers: {}
	};

	games.set(gameName, game);
	return game;
};

/*const getGameByName = (name) => {
	games.forEach((game) => {

		if(game.name === name) {
			return game;
		} else {
			return null
		}
	})
};*/

const getRandomGame = () => {
	const randomNum = Math.floor(Math.random() * games.size);

	let key = Array.from(games.keys())[randomNum];
	let randomQuiz = games.get(key);

	randomQuiz.id = uuid();
	randomQuiz.playersAnswers = [];

	//removeAllPlayers(randomQuiz);

	return randomQuiz;
};

/*const getAllPlayersInGame = (game) => {

	if(games.get(gameId) === undefined || games.get(gameId) === null) {
		return null;
	}

	return games.get(gameId).players

};*/

/*const getAllGames = () => {

	return Array.from(games);

};*/

const getGame = (id) => {

	return games.get(id);
};

/*const deleteGame = (id) => {
	games.delete(id)
};*/

/*const updateGame = (id, updatedValues) => {

	if(getGame(id) === null) {
		return null;
	}

	if(updatedValues.id !== undefined ||
		updatedValues.name === undefined) {
		return null;
	}

	let oldGame = getGame(id);

	oldGame.name = updatedValues.name;
};*/

const addPlayerToGame = (game, username) => {

	if(getGame(game) === null) {
		console.log("Could not find game", game);
		return false;
	}

	game.playersAnswers.push({
		username, score: 0
	});

	game.players.push(username);
	return true;
};

const removeAllPlayers  = (game) => {

	if(getGame(game) === null) {
		console.log("Could not find game", game);
		return false;
	}

	game.players.length = 0;

};



// QUESTIONS

const createQuestion = (game, id, question, ans1, ans2, ans3, ans4, correctAnsIndex) => {

	const input = {
		id,
		question,
		answers: [
			ans1, ans2, ans3, ans4
		],
		correctAnsIndex
	};

	game.questions.push(input);
};

/*
const getAllQuestions = (game) => {
	return game.questions;
};
*/

const getQuestion = (game, index) => {

	if(index > game.questions.length - 1) {
		return null;
	}

	return game.questions[index];
};

/*
const getRandomQuestion = (game) => {

	const randomNum = Math.floor(Math.random() * game.questions.size);

	return game.questions[randomNum]
};
*/

/*
*   ANSWERS
* */

const answerQuestion = (game, username, isCorrect)  => {

	let score;
	let user = game.playersAnswers.filter((player) => {
		return player.username === username;
	});

	console.log("Old answer values >> ", game.playersAnswers[0].score);

	isCorrect ? score = 1 : score = 0;

	game.playersAnswers[0].score += score;

	console.log("Updated answer values >> ", game.playersAnswers[0].score);

};

const getPlayerAnswers = (game) => {

	/*game.playersAnswers.forEach((player) => {

		scoreSum = 0;

		let sum = player.forEach((score) => {
			return sum + score;
		})
	})*/
};

module.exports = {
	createGame,
	//getAllGames,
	getGame,
	//updateGame,
	getRandomGame,
	addPlayerToGame,
	//deleteGame,
	createQuestion,
	//getAllQuestions,
	getQuestion,
	//getRandomQuestion,
	answerQuestion
};