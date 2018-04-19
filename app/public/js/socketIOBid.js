
$(function () {
  var socket = io.connect('http://localhost:8000');
  
  $('.bid-form').submit(function() {
    let bidEvent = { bidAmount: $('#bid-amount').val(), email: 'test@test.com', lotNumber: $(this).attr("lot-number") };
    socket.emit('bid', bidEvent ); // $('#bid').val() is the value picked up by socket to the server
    console.log(bidEvent);
    return false; 
  });
});