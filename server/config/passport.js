const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserRepository = require('../db/userRepository');

passport.use(new LocalStrategy({

		usernameField: 'username',
		passwordField: 'password'

	}, function (username, password, done) {

		const ok = UserRepository.verifyUser(username, password);

		if (!ok) {
			return done(null, false, {
				message: 'Invalid username/password'
			});
		}

		const user = UserRepository.getUser(username);

		return done(null, user);
	}
));

passport.serializeUser(function (user, done) {
	done(null, user.username);
});

passport.deserializeUser(function (username, done) {

	const user = UserRepository.getUser(username);

	if (user !== undefined) {
		done(null, user);
	} else {
		done(null, false);
	}
});

module.exports = passport;