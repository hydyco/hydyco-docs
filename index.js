// express server to host build

const express = require("express");

const server = express(); // better instead

server.use(express.static(__dirname + "/build"));

server.listen(80, () => {
  console.log("Server Started");
});
