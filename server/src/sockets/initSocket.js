const jwt = require('jsonwebtoken');
const {User} = require('../models/User.js');
const { Server } = require('socket.io');

function initSocket(server) {

    // Инициализация ws-сервера
    const io = new Server(server, {
      cors: {
      origin: 'http://localhost:5173', 
      methods: ['GET', 'POST'],
    },
    });

    // Хранилище socket.id и userId
    const socketToUserMap = new Map();

    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) next(new Error('Нет токена'));

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded.id) {
                return next(new Error('Токен не содержит userId'));
            }
            socket.userId = decoded.id;
            socketToUserMap.set(socket.id, socket.userId)
            next();
        } catch (error) {
            console.error('Ошибка аутентификации:', error);
            next(new Error('Неверный токен'));
        }
    });

    io.on('connection', async (socket) => {
        console.log(`Пользователь подключился: socket.id=${socket.id}, userId=${socket.userId}`);

        if (!socket.userId) {
            console.error('Ошибка: userId не определён для socket.id:', socket.id);
            return;
        }

        try {
            const [affectedCount] = await User.update(
                {isOnline : true}, 
                {where: {id: socket.userId}}
            );

            if (affectedCount === 0) {
                console.warn(`Пользователь с userId ${socket.userId} не найден в базе`);
                return;
            };

            io.emit('status', {userId: socket.userId, isOnline: true});
        } catch(error) {
            console.error('Ошибка при обновлении статуса:', error);
        }

        socket.on('disconnect', async () => {
            console.log(`Пользователь отключился: socket.id=${socket.id}, userId=${socket.userId}`);

            try {
                // Удаляем связь socket.id -> userId
                const userId = socketToUserMap.get(socket.id);
                socketToUserMap.delete(socket.id);

                // Проверяем, есть ли другие активные соединения для этого userId
                const hasOtherConnections = Array.from(socketToUserMap.values()).includes(userId);
                if (!hasOtherConnections) {
                    // Обновляем статус, только если нет других соединений
                    await User.update(
                        { isOnline: false },
                        { where: { id: userId } }
                    );
                    io.emit('status', { userId, isOnline: false });
                    }
            } catch (error) {
                console.error('Ошибка при обновлении статуса:', error);
            }
        })
    })
    return io;
}

module.exports = initSocket;