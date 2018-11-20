const socketIo = require("socket.io");
const Token = require("./tokens");
const PlayerQueue = require('../online/playerQueue');
const OngoingMatches = require('../online/ongoingMatches');
const ActivePlayers = require('../online/activePlayers');
const gameRepository = require("../db/gameRepository");

let io;

const start = (server) => {

	io = socketIo(server);

	io.on("connection", (socket) => {

		socket.on("login", (data) => {

			if(data === null || data === undefined) {
				socket.emit("update", { errorMsg: "No data provided, plz send data" });
			}

			// Generate a random token
			const generatedToken = data.wstoken;

			if(generatedToken === null || generatedToken === undefined) {
				socket.emit("update", { errorMsg: "Invalid generated token" });
			}

			const username = Token.consumeToken(generatedToken);

			if(username === null || username === undefined) {
				socket.emit("update", { errorMsg: "Invalid generated token" });
			}

			// if token is valid and all checks pass, connect the socket to the player
			ActivePlayers.registerSocket(socket, username);
		});

		socket.on("joinGame", (data) => {

			//check if player is already in the queue
			if(PlayerQueue.hasUser(data.username)) {
				socket.emit("update", { errorMsg: "User is already in the queue" });
				return;
			}

			//TODO implement this after game logic is finished
			//OngoingMatches.forfeit(req.user.id);

			PlayerQueue.addUser(data.username);

			socket.emit("updateNumberOfPlayers", (PlayerQueue.size()));

		});

		socket.on("startGame", () => {

			let usersInCurrentGame = PlayerQueue.takeAllUsersInQueue();

			console.log("User in the game >> ", usersInCurrentGame);

			/*
			//TODO uncomment this to set requirement for min 2 users to start the game
			if(usersInCurrentGame === null) {
				socket.emit("update", {
					errorMsg: "It needs to be at least 3 users in the game"
				});
				return;
			}
			*/

			let game = gameRepository.getRandomGame();

			usersInCurrentGame.forEach((user) => gameRepository.addPlayerToGame(game, user));

			//All players join the socket room
			usersInCurrentGame.forEach((user) => ActivePlayers.getSocket(user).join(game.id));

			io.to(game.id).emit("renderGame", ({
				game: game,
				errorMsg: null
			}));
		});

		socket.on("userLeftGame", (gameId) => {

			console.log("Entered backend socket");

			if(gameId === null) {
				console.log("ERROR, gameId === NULL");
			}

			io.to(gameId).emit("endGame");
		});

		socket.on("getQuestion", (game) => {

			let numOfQuestions = 5;
			let i = 0;

			emitQuestions(game, i++);

			let interval = setInterval(() => {

				if(i < numOfQuestions) {
					emitQuestions(game, i++)
				} else {
					clearInterval(interval);

					io.to(game.id).emit("endGame");
				}

			}, 5000);

		});

		//Help method for getQuestion
		const emitQuestions = (game, i) => {
			io.to(game.id).emit("receiveQuestion", { question: gameRepository.getQuestion(game, i) });
		};


		socket.on("answerQuestion", (data) => {

			gameRepository.answerQuestion(data.game, data.username, data.isCorrect);
		});


		/**
		 * On disconnection
		 */
		socket.on("disconnect", () => {
			ActivePlayers.removeSocket(socket.id);
			//OngoingMatches.forfeit(userId);
		});
	});
};

module.exports = {start};