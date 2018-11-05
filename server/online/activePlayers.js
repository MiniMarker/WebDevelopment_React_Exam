
/*
    This code is copy/pasted from this file with minor changes:
    https://github.com/arcuri82/pg6300/blob/master/les11/connect4-v2/src/server/online/active_players.js
 */

const socketToUser = new Map();

const userToSocket = new Map();


function registerSocket(socket, username){

	socketToUser.set(socket.id, username);
	//console.log("socketToUser", socketToUser);
	userToSocket.set(username, socket);
	//console.log("userToSocket", userToSocket);
}

function removeSocket(socketId){

	const username = socketToUser.get(socketId);
	socketToUser.delete(socketId);
	userToSocket.delete(username);
}


function removeUser(username){

	const socketId = userToSocket.get(username).id;
	userToSocket.delete(username);
	socketToUser.delete(socketId);
}


function isActive(username){
	return userToSocket.has(username);
}

function getSocket(username){
	return userToSocket.get(username);
}

function getUser(socketId){
	return socketToUser.get(socketId);
}

module.exports = {registerSocket, removeSocket, removeUser, isActive, getSocket, getUser};