var express = require("express");

var server = express(); // better instead
server.use(express.static(__dirname + "/build"));

server.listen(80, () => {
  console.log("Server Started");
});
