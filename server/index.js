const express = require("express");
const game = require("./game");
const handler = require("./httpHandler")
const fitnessTrackerController = require("./fitnessTrackerController");


const server = express();

server.use("/client", express.static("./jquery-mockup"))
server.use("/game", game);
server.use("/old", handler.main);
//server.use("/fitness/routines", (req, res)=> res.send([{name: 'AAA', duration: 2}, {}, {}])

    

server.listen(3001);

console.log("http://localhost:3001");