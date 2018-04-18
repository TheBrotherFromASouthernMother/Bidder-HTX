<script src="http://localhost:8000/socket.io/socket.io.js"></script>
$(function () {
    var socket = io.connect('http://localhost:8000');
    $('.bidForm').submit(function() {
        socket.emit('bid', $('#bid-amount').val()); // $('#bid').val() is the value picked up by socket to the server
        $('#bid-amount').val();
        console.log($('#bid-amount').val());
        return false; 
    });
    socket.on('bid', function(value) { // this acts on the HTML to add bid data
        "[  bids]"
        $('#bidHistory').append($('<li>').text(value));
    });
});