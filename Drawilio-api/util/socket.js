const { Server } = require("socket.io");
const consola = require('consola');
const gameManager = require('./gameManager');

exports.init = (httpServer) => {

    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });

    io.on('connection', socket => {
        consola.info("Socket connected  with " + socket.id);
        let { username, roomId, action, picture } = socket.handshake.query;

        username = username.substring(0, 18)
        consola.info(`Current socket query params  ${username}  ${roomId} ${action} ${picture} `)
        const room = new gameManager.Room({ io, socket, username, roomId, action, picture })
        room.init(username);
        room.listenCords();
        room.listenToMessages();
        room.onDisconnect();
        room.listenToErase();
    });

}