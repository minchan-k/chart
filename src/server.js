const server = require('http').createServer();
const os = require('os-utils');

const io = require('socket.io')(server, {
    transports: ['websocket', 'polling']
});

// 1. listen for socket connections
io.on('connection', (client) => {
    setInterval(() => {
        // 2. every second, emit a 'cpu' event to user
        os.cpuUsage((cpuPercent) => {
            client.emit('cpu', {
                name: `${new Date().getMinutes()} : ${new Date().getSeconds() >= 10 && new Date().getSeconds() !== 0 ? new Date().getSeconds() : '0'+new Date().getSeconds()}`,
                value: cpuPercent
            });
        });
    }, 3000)
});


server.listen(3000);
