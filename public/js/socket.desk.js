// Conection
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('You need a Desk.');
};

var desktop = searchParams.get('escritorio');
var label = $('small');

console.log(desktop);

$('h1').text('Escritorio ' + desktop);

$('button').on('click', function () {
    socket.emit('attendTicket', { desktop: desktop }, function (resp) {
        if (resp === 'No Tickets to attend') {
            $('h4').text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.number);
    });
});