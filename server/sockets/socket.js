const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.nextTicket();

        callback(next);
    });

    client.emit('actualState', {
        actual: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFourTicket()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                err: true,
                message: 'We need the Desk'
            });
        }

        let attendTicket = ticketControl.attentionTicket(data.desktop);

        callback(attendTicket);
    });

    client.broadcast.emit('lastFour', (data) = {
        lastFour: ticketControl.getLastFourTicket()
    });
});