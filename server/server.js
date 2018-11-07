const app = require("./app");
const WsHandler = require("./config/sockets");
const server = require("http").Server(app);

const port = process.env.PORT || 8080;
WsHandler.start(server);

server.listen(port, () => {
	console.log('Starting server on port ' + port);
});