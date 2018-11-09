const socketIo = require("socket.io");
const Token = require("./tokens");
const ActivePlayers = require('../online/activePlayers');
//const OngoingMatches = require('../online/ongoing_matches');

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

			//console.log(`data sent >>`, data);

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
			console.log(`${username} >> connected`);
		});

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