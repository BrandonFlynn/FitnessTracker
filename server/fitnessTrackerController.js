const express = require("express");
const fitnessTracker = require("./fitnessTrackerObject");

const router = express.Router();

router
    .get("/exercises", (req, res) => res.send(fitnessTracker.exercises))

module.exports.router = router;