const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const path = require('path');
const cors = require('cors');

const passport = require("./passport");
const authRoutes = require('../routes/authRoutes');
const matchRoutes = require('../routes/matchRoutes');

const app = express();

/*
    We use an environment variable to decide if allowing all origins
    or not
 */
if(process.env.CORS){
	console.log("Using CORS to allow all origins");
	app.use(cors());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*
    As we are going to use session-based authentication with
    cookies, we need to tell Express to create new sessions.
    The cookie will store user info, encrypted.
 */
app.use(session({
	secret: 'TPlRuXtJmMFJGWBaxhCX4yvfLusywnVR',
	resave: false,
	saveUninitialized: false
}));


//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());


//--- Routes -----------
app.use('/api', authRoutes);
app.use('/api', matchRoutes);

//handling 404
/*
app.use((req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});
*/

app.all('*', function (req, res) {
	res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')) /* <= Where my ng-view is located */
});

module.exports = app;
