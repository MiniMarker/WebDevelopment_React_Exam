const express = require('express');

const PlayerQueue = require('../online/playerQueue');
const ActivePlayers = require('../online/activePlayers');
//const OngoingMatches = require('../online/ongoing_matches');

const router = express.Router();

router.post("/matches", (req, res) => {

	console.log("Entered /api/matches");

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

	while(PlayerQueue.size() > 0) {

		//get a player from queue
		//TODO CHANGE THIS TO TAKE ALL USERS IF THERE ARE MORE THAN X-1 IN THE QUEUE
		// THIS WILL THAN RETURN AN ARRAY OF PLAYERS INSTEAD OF ONLY ONE

		let players;

		if(PlayerQueue.size() === 2) {
			players = PlayerQueue.takeMultipleUsers(2);
			console.log(players);
			console.log("Starting game..");
		} else {
			PlayerQueue.addUser(req.user.username);
		}

		//const player = PlayerQueue.takeUser();
/*
		if(!ActivePlayers.isActive(player)) {
			continue;
		}
		*/

		//console.log(`${player} joined a game`);
		//TODO instead of starting the game, the user will be added to the game


		//TODO MAKE THIS TAKE A ARRAY OF OPPONENTS INSTEAD OF ONLY ONE
		//OngoingMatches.startMatch(req.user.id, opponent);

		res.status(201).send();
		return;
	}

	console.log(`${req.user.username} is now a host`);
	PlayerQueue.addUser(req.user.username);
	res.status(201).send();
});

module.exports = router;