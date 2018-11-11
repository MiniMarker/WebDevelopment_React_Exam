/*
let gameRepository = {
	// liste over spillere
	id: uuid,
	name: "",
	players: [username1, username2, username3]

};
*/

const uuid = require('uuid');

//TODO use Map of entity object
let quizzes = new Map();

const createQuiz = (question, ans1, ans2, ans3, ans4, correctAns) => {

	const quiz = {
		id: uuid(),
		question,
		ans1,
		ans2,
		ans3,
		ans4,
		correctAns
	};

	quizzes.set(quiz.id, quiz);
};

const getAllQuizzes = () => {
	return Array.from(quizzes.entries());
};

const getQuiz = (id) => {
	return quizzes.get(id);
};

const getRandomQuiz = () => {

	const randomNum = Math.floor(Math.random() * quizzes.size);

	return Array.from(quizzes.entries())[randomNum]
};


module.exports = {createQuiz, getQuiz, getAllQuizzes, getRandomQuiz};