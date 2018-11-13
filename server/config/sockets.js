const socketIo = require("socket.io");
const Token = require("./tokens");
const PlayerQueue = require('../online/playerQueue');
const OngoingMatches = require('../online/ongoingMatches');
const ActivePlayers = require('../online/activePlayers');
const gameRepository = require("../db/gameRepository");

let io;

const start = (server) => {

	io = socketIo(server);
	/**
	 * On connection
	 */
	io.on("connection", (socket) => {

		/**
		 * On login emit
		 */
		socket.on("login", (data) => {

			if(data === null || data === undefined) {
				socket.emit("update", {
					errorMsg: "No data provided, plz send data"
				});
			}

			// Generate a random token
			const generatedToken = data.wstoken;

			if(generatedToken === null || generatedToken === undefined) {
				socket.emit("update", {
					errorMsg: "Invalid generated token"
				});
			}

			const username = Token.consumeToken(generatedToken);
			//console.log(`Token ${generatedToken} for ${username} consumed`);

			if(username === null || username === undefined) {
				socket.emit("update", {
					errorMsg: "Invalid generated token"
				});
			}

			// if token is valid and all checks pass, connect the socket to the player
			ActivePlayers.registerSocket(socket, username);
		});

		socket.on("joinGame", (data) => {

			//check if player is already in the queue
			if(PlayerQueue.hasUser(data.username)) {
				console.log(`${data.username} is already in the queue`);
				return;
			}

			//TODO implement this after game logic is finished
			//OngoingMatches.forfeit(req.user.id);

			PlayerQueue.addUser(data.username);

			socket.emit("updateNumberOfPlayers", (PlayerQueue.size()));

		});

		socket.on("startGame", () => {

			let usersInCurrentGame = PlayerQueue.takeAllUsersInQueue();
			// OLD let game = OngoingMatches.startGame(usersInCurrentGame);

			console.log("User in the game >> ", usersInCurrentGame);

			/*
			if(usersInCurrentGame === null) {
				socket.emit("update", {
					errorMsg: "It needs to be at least 3 users in the game"
				});
				return;
			}
			*/

			let game = gameRepository.getRandomGame();

			usersInCurrentGame.forEach((user) => gameRepository.addPlayerToGame(game, user));
			usersInCurrentGame.forEach((user) => ActivePlayers.getSocket(user).join(game.id));

			io.to(game.id).emit("renderGame", ({
				game: game,
				errorMsg: `Let the game begin!`
			}));
		});

		socket.on("getQuestion", (game) => {

			let i = 0;

			let interval = setInterval(() => {

				i < 3 ? emitQuestions(game, i++) : clearInterval(interval);

			}, 3000);
		});

		//Help method for getQuestion
		const emitQuestions = (game, i) => {
			io.to(game.id).emit("receiveQuestion", ({
				question: gameRepository.getQuestion(game, i)
			}));
		};



		/**
		 * On disconnection
		 */
		socket.on("disconnect", () => {

			let username = ActivePlayers.getUser(socket.id);
			console.log(`${username} has disconnected`);

			ActivePlayers.removeSocket(socket.id);
			//OngoingMatches.forfeit(userId);

		});

	});
};

module.exports = {start};