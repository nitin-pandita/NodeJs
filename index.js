// Debugger
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db');

const config = require("config");
const Joi = require("joi"); // Import Joi module correctly
const helmet = require("helmet");
const morgan = require("morgan");
// importing the middleware function
const logger = require("./middleware/middleware");
const express = require("express");
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

// Todo - Templating Engine

app.set('view engine','pug');
app.set('views', './views') // default

//? Configuration

console.log(`Application Name: ${config.get("name")}`);
console.log(`Server Name: ${config.get("mail.host")}`);
// console.log(`Mail Password: ${config.get("mail.password")}`); 

// TODO - Environments

// console.log(`Node Env : ${process.env.NODE_ENV}`)
// console.log(`app : ${app.get('env')}`)

// TODO - Build in MiddleWare

app.use(express.json()); // req.body

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(helmet());

app.use('/api/courses',courses)

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled..");
  
}
// db Debugger
dbDebugger('Connected to the database');
//Todo - MiddleWare function

app.use(logger);
app.use(function (req, res, next) {
  console.log("Authentication");
  // it is necessary to put the next() for giving the access to other middle wear
  next();
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
