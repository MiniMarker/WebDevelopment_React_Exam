const uuid = require('uuid');

let games = new Map();


// CRUD

const createGame = (name) => {

	const game = {
		id: uuid(),
		name: name,
		players: []
	};

	console.log(`Game: ${name} created`);

	games.set(name, game);
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

const getAllGames = () => {

	return Array.from(games.entries());

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

	if(!getGame(game.id)) {
		console.log("Could not find game", game);
		return false;
	}

	console.log(`Added ${username} to ${game.name}`);

	game.players.push(user);
	return true;
};

module.exports = {createGame, getAllGames, getGame, updateGame, addPlayerToGame, deleteGame, getGameByName};


/*
let Game = {
	// liste over spillere
	id: uuid,
	name: "",
	players: [username1, username2, username3]

};

// games er en array av game
let Games = {

	//liste over Game som venter på spillere
	pendingGames: [Game, Game, Game],

	//liste over Game som er i gang
	ongoingGames: [Game, Game]

};
*/