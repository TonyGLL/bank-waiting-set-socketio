const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
};

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tikects = [];
        this.lastFour = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.rebootCounting();
        }
    }

    nextTicket() {
        this.last += 1;

        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveFile();

        return `Ticket ${this.last}`;
    };

    getLastTicket() {
        return `Ticket ${this.last}`;
    };

    getLastFourTicket() {
        return this.lastFour;
    };

    attentionTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'No Tickets to attend';
        }

        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();

        let attendTicket = new Ticket(ticketNumber, desktop);

        this.lastFour.unshift(attendTicket);

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1); // Delete the last ticket
        }

        this.saveFile();

        return attendTicket;
    }

    rebootCounting() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];

        this.saveFile();
    };

    saveFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    };
};

module.exports = {
    TicketControl
};