let express = require('express');

let router = express.Router();

router
.get('/quotes', function(req, res) {
    res.send({name: "Brandon"})
})
.get('/pictures', function(req, res) {
    res.send({picture: "I'm a picture. :)"})
})

module.exports = router;