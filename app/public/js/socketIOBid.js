$(function () {
  var socket = io.connect('http://localhost');
  $('.bid-form').submit( () => {
    var bidSubmitted = $('#bid-amount').val();
    console.log(bidSubmitted);
    var bidEvent = { bidAmount: bidSubmitted, userId: $('.navbar-text').attr("userId"), lotNumber: $('.lot-number').attr("lot-number") };
    socket.emit('bid', bidEvent ); // bidEvent is the object sent by socket to the server
    console.log(bidEvent);
    return false;
  });
  $('.bid-form').submit( () => {
    setTimeout( () => {
      window.location.assign('/payment');
    }, 3000);
  });
});
