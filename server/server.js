const app = require("./config/app");
const WsHandler = require("./config/sockets");
const server = require("http").Server(app);

//Default data
const defaultData = require("../server/db/DefaultData");

defaultData.createDefaultUsers();
defaultData.createDefaultQuizzes();

//Starting server
const port = process.env.PORT || 8080;
WsHandler.start(server);

server.listen(port, () => {
	console.log('Starting server on port ' + port);
});