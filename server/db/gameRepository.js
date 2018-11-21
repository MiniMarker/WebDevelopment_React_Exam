
let games = new Map();

// CRUD

/*
*   GAME
* */

const createGame = (gameName) => {

	const game = {
		name: gameName,
		questions: [],
	};

	games.set(gameName, game);
	return game;
};

const getRandomGame = () => {
	const randomNum = Math.floor(Math.random() * games.size);

	let key = Array.from(games.keys())[randomNum];
	return games.get(key);
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

const getQuestion = (game, index) => {

	if(index > game.questions.length - 1) {
		return null;
	}

	return game.questions[index];
};

module.exports = {
	createGame,
	getRandomGame,
	createQuestion,
	getQuestion,
};