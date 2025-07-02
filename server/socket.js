const ws = require('ws');
const jwt = require('jsonwebtoken');
const { User } = require('./models/User.js');
const { broadcastOnlineUsers } = require('./utils/broadcastOnlineUsers.js');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;  

const initWebsocketServer = (httpServer) => {
    
    const onlineUsers = new Map();
    const wss = new ws.Server({ server: httpServer, path: '/ws' });

    wss.on('connection', async (socket, req) => {

        //Берём токен из protocols
        const protocols = req.headers['sec-websocket-protocol'];
        const token = Array.isArray(protocols) ? protocols[0] : protocols;

        let userId;

        // Проверка токена
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            userId = decoded.id;

            if (!onlineUsers.has(userId)) {
                onlineUsers.set(userId, new Set());
                // первый сокет этого пользователя - обновляем БД
                await User.update({isOnline : true}, {where : { id: userId}});
                broadcastOnlineUsers(wss, onlineUsers);
            }

            onlineUsers.get(userId).add(socket);

            socket.on('close', async () => {
                const userSockets = onlineUsers.get(userId);
                userSockets.delete(socket);

                if (userSockets.size === 0) {
                    onlineUsers.delete(userId);
                    await User.update({ isOnline: false }, { where: { id: userId } });
                    broadcastOnlineUsers(wss, onlineUsers);
                }
            })
        } catch (error) {
            console.error('Невалидный токен:', error.message);
            socket.close(); // Закрываем соединение
        }
    })
};

module.exports = {initWebsocketServer}