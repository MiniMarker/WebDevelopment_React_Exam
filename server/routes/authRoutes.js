//Dependencies
const express = require('express');
const router = express.Router();
const passport = require('../passport');

//Local files
const Token = require("../config/tokens");
const User = require('../entities/User');

/**
 * Login
 * Use passport to get session
 */
router.post('/login', passport.authenticate('local'), (req, res) => {

	res.status(204).send();
});

/**
 * Signup
 * 1. Create User in DB
 * 2. Save session
 * 3. Log user in
 */
router.post('/signup', function(req, res) {

	const created = User.createUser(req.body.username, req.body.password);

	if(!created) {
		console.log("Error creating user");
		res.status(400).send();
		return;
	}

	passport.authenticate('local')(req, res, () => {

		req.session.save((err) => {
			if (err) {
				return next(err);
			}

			res.status(200).send();
		});
	});
});

/**
 * Logout by using passports integrated logout function
 */
router.post('/logout', function(req, res) {

	req.logout();
	res.status(204).send();
});

/**
 * Get a Web-Socket token
 * 1. Check if user exist
 * 2. Generate a random token and return it as a JSON object
 */
router.post("/wstoken", (req, res) => {

	if(!req.user) {
		res.status(401).send();
		return;
	}

	const generatedToken = Token.createTokenForUser(req.user.username);

	console.log(`Token for ${req.user.username} >> ${generatedToken}`);

	res.status(201).send({wstoken: generatedToken});

});



/**
 * Get user object for the registred user from passport
 * 1. Check if user exist
 * 2. Return given values back as a JSON
 */
router.get("/user", (req, res) => {

	/*
		If a user is logged in by providing the right session cookie,
		then Passport will automatically instantiate a valid User object
		and add it to the incoming "req" object
	 */

	if(!req.user) {
		res.status(401).send();
	} else {

		res.json({
			username: req.user.username
		});
	}
});

module.exports = router;
