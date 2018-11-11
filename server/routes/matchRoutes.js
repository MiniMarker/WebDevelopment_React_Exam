const express = require('express');

const PlayerQueue = require('../online/playerQueue');
//const ActivePlayers = require('../online/activePlayers');
const OngoingMatches = require('../online/ongoingMatches');

const router = express.Router();

/**
 * When a user calls on this endpoint the user will be added to the player queue on the server
 *
 * 1. Check if user is authenticated, return 401 and redirect user to login if not.
 * 2. Check if the user is already in the queue, send a 204 and return if so.
 * 3. If the authenticated user is in an ongoing match when trying to join an new one,
 *      make the user quit and loose the previous game
 * 4. Add the user to the queue and return 201
 */
router.post("/joinqueue", (req, res) => {

	//TODO If match has no users, make first to join a host

	//if user isn't logged in
	if(!req.user) {
		res.status(401).send();
		return;
	}

	//check if player is already in the queue
	if(PlayerQueue.hasUser(req.user.username)) {
		console.log(`${req.user.username} is already in the queue`);
		res.status(204).send();
		return;
	}

	//TODO implement this after game logic is finished
	//OngoingMatches.forfeit(req.user.id);

	console.log(`${req.user.username} has joined the queue`);
	PlayerQueue.addUser(req.user.username);
	res.status(201).send();
});

/**
 * When the host of the game calls on this endpoint all users in the queue will be removed from the queue
 * and the game will start.
 *
 * 1. Check if user is authenticated, return 401 and redirect user to login if not.
 * 2. Iterate through all users in queue from the front (FIFO) and remove them from the queue
 * 3. Return a 201 with all users in the body of the payload
 *
 * TODO maybe cap this to a max amount of players?
 */
router.post("/startgame", (req, res) => {

	console.log("Entered /api/startgame");

	//if user isn't logged in
	if(!req.user) {
		res.status(401).send();
		return;
	}

	//const allUsers = PlayerQueue.getAllUsersInQueue();
	//console.log(`getAllUsersInQueue >> ${allUsers}`);

	//for(let username in allUsers) {
	//	console.log(username);
	//}

	let usersInCurrentGame = PlayerQueue.takeAllUsersInQueue();
	console.log(`takeAllUsersInQueue >> ${usersInCurrentGame}`);

	OngoingMatches.startGame(usersInCurrentGame);

	res.status(201).send();
	return;
});

module.exports = router;
