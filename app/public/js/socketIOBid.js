
$(function () {
  var socket = io.connect('http://localhost:8000');
  
  $('.submit-bid').submit(function() {
    let bidEvent = { bidAmount: $('#bid-amount').val(), email: $(this).attr("email"), lotNumber: $(this).attr("lot-number") };
    socket.emit('bid', bidEvent ); // $('#bid').val() is the value picked up by socket to the server
    console.log(bidEvent);
    return false; 
  });
});