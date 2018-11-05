const socketIo = require("socket.io");
const Token = require("./tokens");
const ActivePlayers = require('../online/activePlayers');
//const OngoingMatches = require('../online/ongoing_matches');

let io;

const start = (server) => {

	io = socketIo(server);
	console.log("Start of socket");
	/**
	 * On connection
	 */
	io.on("connection", (socket) => {

		console.log("Entered connection in sockets");

		/**
		 * On login emit
		 */
		socket.on("login", (data) => {

			console.log("Entered login in sockets");

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
			console.log("Token consumed!");

			if(username === null || username === undefined) {
				socket.emit("update", {
					errorMsg: "Invalid generated token"
				});
			}

			// if token is valid and all checks pass, connect the socket to the player
			ActivePlayers.registerSocket(socket, username);
			console.log(`${username} connected`);
		});


		/**
		 * On disconnection
		 */
		io.on("disconnect", () => {
			const username = ActivePlayers.getUser(socket);

			ActivePlayers.registerSocket(socket.id);

			//OngoingMatches.forfeit(userId);

			console.log(`${username} has disconnected the game`);

		});
	});
};

module.exports = {start};