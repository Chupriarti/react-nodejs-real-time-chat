const ws = require('ws');

const wss = new ws.Server({
    port: 5000
}, () => console.log('Server started on 5000'));

wss.on('connection', function connection (ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':

                break;
            case 'connection':

                break;
        }
    });
});

/* Sample data
const message = {
    event: 'message/connection',
    id: 123,
    date: '21.01.2021',
    username: 'Chu',
    message: 'Hello chat'
}
*/
