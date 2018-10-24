const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./entities/user');

passport.use(new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password'
	},
	function (username, password, done) {

		const ok = User.verifyUser(username, password);

		if (!ok) {
			return done(null, false, {message: 'Invalid username/password'});
		}

		const user = User.getUser(username);

		console.log("logged in!", user);

		return done(null, user);
	}
));

passport.serializeUser(function (user, done) {
	done(null, user.username);
});

passport.deserializeUser(function (username, done) {

	const user = User.getUser(username);

	if (user !== undefined) {
		done(null, user);
	} else {
		done(null, false);
	}
});

module.exports = passport;