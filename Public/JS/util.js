// Variables
var socket = io();

console.log(socket);

// Functions
function sendMessageWithResponse(channel, data, timeout, callback) {

  var responded = false;

  const response = socket.on(channel, function(r_data) {

    responded = true;

    if (!r_data.error) {
      callback(true, r_data);
    } else {
      callback(false, r_data.error);
    }
  });

  socket.emit(channel, data);

  setTimeout(function() {

    console.log("test");
    socket.off(channel);

    if (!responded) {
      callback(false, "Server failed to respond");
    }
  }, timeout)
}