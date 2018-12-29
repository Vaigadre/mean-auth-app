const express = require ("express");
const path = require("path"); // core module
const bodyParser = require ("body-parser");
const mongoose = require ("mongoose");
const cors = require ("cors");
const passport = require ("passport");
const config = require ('./config/database');

mongoose.connect(config.database);

mongoose.connection.on ('connected', () => {
	console.log('connected to database ' + config.database);
});

mongoose.connection.on ('error', (err) => {
	console.log('database error' + err);
});

const app = express();

const users = require('./routes/users');

//port number
const port = 8000;

//CORS middleware
app.use (cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport') (passport);

app.use('/users', users);

//Index route
app.get ("/", (req, res) => {
	res.send ("Invalid page encountered!!");
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
})

//start server
app.listen (port, () => {
	console.log("servers started at port " +port);
});
