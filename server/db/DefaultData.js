const userRepository = require("./userRepository");
const gameRepository = require("./gameRepository");

const createDefaultUsers = () => {

	console.log("Init default users..");

	userRepository.createUser("1", "1");
	userRepository.createUser("2", "2");
};


const createDefaultGames = () => {

	console.log("Init default games..");

	let movieGame = gameRepository.createGame("Movies");
	let randomGame = gameRepository.createGame("Random");
	let geographyGame = gameRepository.createGame("Geography");

	gameRepository.createQuestion(movieGame, 0, "Who is the president of the galaxy?", "Arthur Dent?", "Zaphod Beeblebrox", "Ford Prefect", "Marvin", 1);
	gameRepository.createQuestion(movieGame, 1, "Who guard the secret treasure of the Lonely Mountain?", "Aragon", "Gandalf", "Sauron", "Smaug", 3);
	gameRepository.createQuestion(movieGame, 2, "Who plays Elliot in Mr. Robot?", "Eddie Redmayne", "Rami Malek", "Aaron Paul", "Benedict Cumberbatch", 1);
	gameRepository.createQuestion(movieGame, 3, "As of end of 2018. How many MCU-movies have there been released?", "12", "15", "20", "22", 2);
	gameRepository.createQuestion(movieGame, 4, "In witch year was the original Westworld movie released?", "1964", "1970", "1974", "1980", 2);
	gameRepository.createQuestion(movieGame, 5, "How many films are there in The Hobbit series?", "0", "1", "2", "3", 3);
	gameRepository.createQuestion(movieGame, 6, "Who played Hannibal Lecter in Bryan Fuller's tv-series?", "Hugh Dancy", "Mads Mikkelsen", "Laurence Fishburne", "Martin Freeman", 1);
	gameRepository.createQuestion(movieGame, 7, "As of end of 2018. How seasons has there been released of Game of Thrones?", "5", "6", "7", "8", 0);

	gameRepository.createQuestion(randomGame, 0, "What is the meaning og life, the universe and everything?", "Chocolate", "Mice", "42", "A book", 2);
	gameRepository.createQuestion(randomGame, 1, "How much wood would a woodchuck chuck if a woodchuck would chuck wood?", "Infinite", "42", "Depends on the woodchuck", "100", 2);
	gameRepository.createQuestion(randomGame, 2, "How many hole cards is each player dealt in Texas Hold 'Em?", 1, 2, 3, 4, 1);
	gameRepository.createQuestion(randomGame, 3, "What is the digital assistant Siri named after?", "A weather reporter", "Its an acronym", "Nothing, just a random name", "A technology", 0);
	gameRepository.createQuestion(randomGame, 4, "How many points is a bullseye worth in darts?", 45, 50, 55, 60, 1);
	gameRepository.createQuestion(randomGame, 5, "What is 'pub' short for?", "Nothing, just a name", "Pigs house", "Pouring house", "Public house", 1);
	gameRepository.createQuestion(randomGame, 6, "What soccer team won the Premier League in 2004?", "Liverpool", "Manchester City", "Arsenal", "Leeds", 2);
	gameRepository.createQuestion(randomGame, 7, "Vermilion is a shade of which color?", "Yellow", "Green", "Blue", "Red", 3);

	gameRepository.createQuestion(geographyGame, 0, "Which European city is famous for its Latin Quarter? ", "Oslo", "Berlin", "Moscow", "Paris", 3);
	gameRepository.createQuestion(geographyGame, 1, "What city is home to The CN Tower?", "Stockholm", "Rio de Janairo", "Torono", "New York", 2);
	gameRepository.createQuestion(geographyGame, 2, "What is the second largest state in the US?", "Washington", "Texas", "Alaska", "New York", 1);
	gameRepository.createQuestion(geographyGame, 3, "Which Nordic country is the larges? ", "Norway", "Sweden", "Finland", "Denmark", 2);
	gameRepository.createQuestion(geographyGame, 4, "Greenland is a dependency of what European country?", "Denmark", "Russia", "Germany", "Iceland", 0);
	gameRepository.createQuestion(geographyGame, 5, "In 1917, Finland declared its independence from what country?", "Russia", "England", "Sweden", "Germany", 0);
	gameRepository.createQuestion(geographyGame, 6, "What US city is known as the 'birthplace of Jazz'? ", "Chicago", "New Orleans", "San Francisco", "New York", 1);
	gameRepository.createQuestion(geographyGame, 7, "Springfield is the capital of which US state?", "California", "Ohio", "Texas", "Illinois", 3);
};

module.exports = {createDefaultUsers, createDefaultGames};