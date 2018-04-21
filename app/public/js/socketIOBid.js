// $(function () {
//   console.log('this works');
//   var socket = io.connect('http://localhost:8000/');
//   var bidSubmitted = $('#bid-amount').attr("bid-amount");
//   console.log(bidSubmitted);
//   var bidEvent = { bidAmount: bidSubmitted, userId: $('.navbar-text').attr("userId"), lotNumber: $('.lot-number').attr("lot-number") };
//   socket.emit('bid', bidEvent ); // bidEvent is the object sent by socket to the server
//   console.log(bidEvent);
//   return false;
// });
