const express = require("express");
const game = require("./game");
const handler = require("./httpHandler")
const fitnessTrackerController = require("./fitnessTrackerController");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

let exercises = [
  {name: 'Running'}, {name: 'Jumping'}, {name: 'Swimming'},
  {name: 'Curling'}, {name: 'Pushups'}, {name: 'Crunches'},
  {name: 'Rows'}, {name: 'Jumping Jacks'}, {name: 'Flys'}

];

let users = [{email: 'a@a.com', password: '123', firstName: 'Brandon', lastName: 'Flynn'},
  {email: 'b@b.com', password: '123', firstName: 'A', lastName: 'B'},
  {email: 'c@c.com', password: '123', firstName: 'A', lastName: 'B'}];

let server = express();
server.use(bodyParser.json())
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

server.post('/api/exercises',(req,res)=>{

  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substrRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };


  $('#the-basics .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'exercises',
      source: substringMatcher(exercises)
    });

})







server.get('/api/exercises', (req, res) => res.json(exercises));


server.get('/api/myexercises', (req, res) => {
  if (!req.header('Authorization')) return sendMessage(res, false, 'You are unathorize. Run and hide.');

  let token = req.header('Authorization').split(' ')[1];
  let user = jwt.decode(token, '123');

  let foundUser = findUserByEmail(user);

  res.json(foundUser.exercises);
});


server.post('/api/exercisesCompleted', (req, res) => {
  if (!req.header('Authorization')) return sendMessage(res, false, 'You are unathorize. Run and hide.');

  let token = req.header('Authorization').split(' ')[1];
  let user = jwt.decode(token, '123');

  let foundUser = findUserByEmail(user);

  if (!foundUser) return sendMessage(res, false, 'User not found. get out of here');

  if (!foundUser.exercises) return foundUser.exercises = req.body;

  foundUser.exercises.concat(req.body);

  sendMessage(res, true, 'Good job');
});

server.get('/api/users', (req, res) => {
  let loggedInUsers = users.filter(byLoggedInFlag);

  res.json(loggedInUsers);

  function byLoggedInFlag(element) {
    return element.isLoggedIn;
  }
});

server.post('/api/register', (req, res) => {
  let user = req.body;

  let userFound = findUserByEmail(user);

  if (userFound) return sendMessage(res, false, 'Already registered user.');

  user.isLoggedIn = true;

  users.push(user);

  let name = user.firstName + ' ' + user.lastName;

  let token = signToken(user.email);

  sendMessage(res, true, 'Ahoy! Welcome aboard!', name, token);
});


let user = {
  email: 'a@a.com',
  password: '123'
};

server.post('/api/login', (req, res) => {
  let user = req.body;

  let userFound = findUserByEmail(user);


  // 1) if user is undefined
  if (!userFound) return sendMessage(res, false, 'Email incorrect');

  // 2) if passwords match
  if (userFound.password !== user.password) return sendMessage(res, false, 'Password invalid');

  userFound.isLoggedIn = true;

  let {firstName, lastName} = userFound;

  let name = firstName + ' ' + lastName;

  let token = signToken(userFound.email);

  sendMessage(res, true, 'User successfully authenticated', name, token)
});

function signToken(email) {
  return jwt.sign({email}, '123');
}

function findUserByEmail(user) {
  return users.find(byEmail);

  function byEmail(currentUser) {
    return currentUser.email === user.email
  }
}

function sendMessage(res, success, message, name, token) {
  res.json({success, message, name, token});
}

server.use("/client", express.static("./jquery-mockup"))
//server.use("/game", game);
//server.use("/old", handler.main);
//server.use("/fitness/routines", (req, res)=> res.send([{name: 'AAA', duration: 2}, {}, {}])


server.listen(3001);

console.log("http://localhost:3001");
