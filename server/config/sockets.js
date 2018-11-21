const socketIo = require("socket.io");
const Token = require("./tokens");
const PlayerQueue = require('../online/playerQueue');
const ActivePlayers = require('../online/activePlayers');
const gameRepository = require("../db/gameRepository");
const ongoingGameRepository = require("../db/ongoingGameRepository");

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

			/*
			//check if player is already in the queue
			if(PlayerQueue.hasUser(data.username)) {
				socket.emit("update", { errorMsg: "User is already in the queue" });
				return;
			}
			*/

			PlayerQueue.addUser(data.username);

			socket.emit("updateNumberOfPlayers", (PlayerQueue.size()));
		});

		socket.on("startGame", () => {

			let usersInCurrentGame = PlayerQueue.takeAllUsersInQueue();

			console.log(usersInCurrentGame);

			//TODO uncomment this to set requirement for min 2 users to start the game
			if(usersInCurrentGame === null) {
				socket.emit("update", {
					errorMsg: "It needs to be at least 2 users in the game"
				});
				return;
			}

			let game = ongoingGameRepository.startGame();

			console.log("User in the game >> ", usersInCurrentGame);

			usersInCurrentGame.forEach((user) => {
				ongoingGameRepository.addPlayerToGame(game.id, user);
				ActivePlayers.getSocket(user).join(game.id)
			});

			io.to(game.id).emit("renderGame", ({
				game: game,
				errorMsg: null
			}));
		});

		// Handle if a user leaves the game during a match
		socket.on("userLeftGame", (gameId) => {

			if(gameId === null || gameId === undefined) {
				console.log("ERROR, gameId === NULL");
			}

			io.to(gameId).emit("endGame", ({
				players: ongoingGameRepository.getPlayersInOngoingGame(gameId)
			}));

			ongoingGameRepository.endGame(gameId);
		});

		socket.on("getQuestion", (game) => {

			let numOfQuestions = 8;
			let i = 0;

			emitQuestions(game, i++);

			let interval = setInterval(() => {

				if(i < numOfQuestions) {
					emitQuestions(game, i++)
				} else {
					clearInterval(interval);

					io.to(game.id).emit("endGame", ({
						players: ongoingGameRepository.getPlayersInOngoingGame(game.id)
					}));
				}
			}, 5000);

		});

		//Help method for getQuestion
		const emitQuestions = (game, i) => {
			io.to(game.id)
				.emit("receiveQuestion", {
					question: gameRepository.getQuestion(game, i)
				});
		};

		// Handle Answer question event,
		socket.on("answerQuestion", (data) => {
			ongoingGameRepository.updateTimeScore(data.gameId, data.username, data.timestamp);
		});


		/**
		 * On disconnection
		 */
		socket.on("disconnect", () => {
			ActivePlayers.removeSocket(socket.id);
		});
	});
};

module.exports = {start};