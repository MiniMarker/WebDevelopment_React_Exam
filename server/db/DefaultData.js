const quizRepository = require("./quizRepository");
const userRepository = require("./userRepository");
const gameRepository = require("./gameRepository");

const createDefaultUsers = () => {

	console.log("Init default users..");

	userRepository.createUser("1", "1");
	userRepository.createUser("2", "2");
};

const createDefaultQuizzes = () => {

	console.log("Init default quizzes..");

	quizRepository.createQuiz("What is the meaning og life, the universe and everything?", "Chocolate", "Mice", "42", "A book", 3);
	quizRepository.createQuiz("How much wood would a woodchuck chuck if a woodchuck would chuck wood?", "Infinite", "42", "Depends on the woodchuck", "100", 2);
	quizRepository.createQuiz("Who is the president of the galaxy?", "Arthur Dent", "Zaphod Beeblebrox", "Ford Prefect", "Marvin", 2);
	quizRepository.createQuiz("Who guard the secret treasure of the Lonely Mountain", "Aragon", "Gandalf", "Sauron", "Smaug", 3);
	quizRepository.createQuiz("Who is the director of The Dark Knight", "Christopher Nolan", "Ridley Scott", "Quentin Tarantino", "David Fincher", 1);
};


const createDefaultGames = () => {

	let movieGame = gameRepository.createGame("Movies");
	let randomGame = gameRepository.createGame("Random");
	let geographyGame = gameRepository.createGame("Geography");

	gameRepository.createQuestion(movieGame, "Who is the president of the galaxy?", "Arthur Dent", "Zaphod Beeblebrox", "Ford Prefect", "Marvin", 1);
	gameRepository.createQuestion(movieGame, "Who guard the secret treasure of the Lonely Mountain", "Aragon", "Gandalf", "Sauron", "Smaug", 2);
	gameRepository.createQuestion(movieGame, "Who is the director of The Dark Knight", "Christopher Nolan", "Ridley Scott", "Quentin Tarantino", "David Fincher", 0);

	gameRepository.createQuestion(randomGame, "What is the meaning og life, the universe and everything?", "Chocolate", "Mice", "42", "A book", 2);
	gameRepository.createQuestion(randomGame, "How much wood would a woodchuck chuck if a woodchuck would chuck wood?", "Infinite", "42", "Depends on the woodchuck", "100", 2);
	gameRepository.createQuestion(randomGame, "How many hole cards is each player dealt in Texas Hold 'Em?", 1, 2, 3, 4, 1);

	gameRepository.createQuestion(geographyGame, "Which European city is famous for its Latin Quarter? ", "Oslo", "Berlin", "Moscow", "Paris", 3);
	gameRepository.createQuestion(geographyGame, "What city is home to The CN Tower?", "Stockholm", "Rio de Janairo", "Torono", "New York", 2);
	gameRepository.createQuestion(geographyGame, "What is the second largest state in the US?", "Washington", "Texas", "Alaska", "New York", 1);
};



module.exports = {createDefaultQuizzes, createDefaultUsers, createDefaultGames};