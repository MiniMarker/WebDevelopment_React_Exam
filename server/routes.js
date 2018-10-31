const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('./entities/User');

/*
    The login will apply the Passport filter to check if provided
    username/password are correct.
    See "passport.use(new LocalStrategy" in app.js
 */
router.post('/api/login', passport.authenticate('local'), (req, res) => {

	res.status(204).send();
});

router.post('/api/signup', function(req, res) {

	console.log("response entered route");
	const created = User.createUser(req.body.username, req.body.password);

	console.log("User created?", created);

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

	console.log("after auth");
});

router.post('/api/logout', function(req, res) {

	req.logout();
	res.status(204).send();
});

/*
    Provide info on logged in user
 */
router.get("/api/user", (req, res) => {

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
