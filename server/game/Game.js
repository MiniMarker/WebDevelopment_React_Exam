const uuid = require('uuid');

const GameState = require('../shared/quizState');
const ActivePlayers = require('../online/activePlayers');

class Game {
	constructor(playerUsernames, callbackWhenGameIsFinished) {

		//this.game = new GameState();

		this.players = playerUsernames;
		this.gameId = uuid();

		//Sockets
		this.sockets = new Map();

		/*
		playerUsernames.forEach((username) => {
			this.sockets.set(username, ActivePlayers.getSocket(username));
		});
		*/

		this.callbackWhenGameIsFinished = callbackWhenGameIsFinished;
	};

	start() {
		/*
		this.players.forEach((player) => {
			console.log("Start >> calling for registrerListener for user " + player);
			this.registrerListener(player)
		});

		//Send state to all players
		this.players.forEach((player) => {
			console.log("Start >> sending state to " + player);
			this.sendState(player)
		});
		*/
	};

	registrerListener(username) {
		const socket = this.sockets.get(username);

		console.log(`registrerListener >> socket: ${socket.id} >> user: ${username}`);

		socket.removeAllListeners('answerQuestion');

		socket.on("answerQuestion", (data) => {

			if(data === null || data === undefined) {
				socket.emit("update", {error: "No payload provided"});
				return;
			}

			console.log(`Handling answerQuestion from ${username}`);

			//TODO make logic for answering question

			this.players.forEach((player) => {
				this.sendState(player);
			});
		});
	};

	sendState(username) {

		console.log(`Sending state to ${username} for game ${this.gameId}`);

		const socket = this.sockets.get(username);

		//socket.emit("update")

	}
}

module.exports = Game;