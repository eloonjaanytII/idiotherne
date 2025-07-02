const broadcastOnlineUsers = (wss, onlineUsers) => {

    const onlineIds = Array.from(onlineUsers.keys());

    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(JSON.stringify({
                type: 'online_users',
                payload: onlineIds,
            }))
        }
    });

}

module.exports = {broadcastOnlineUsers}