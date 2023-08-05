// Debugger
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db');

const config = require("config");
const Joi = require("joi"); // Import Joi module correctly
const helmet = require("helmet");
const morgan = require("morgan");
// importing the middleware function
const logger = require("./middleware");
const express = require("express");
const app = express();

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

const courses = [
  { id: 1, course: "course1" },
  { id: 2, course: "course2" },
  { id: 3, course: "course3" },
  { id: 4, course: "course4" },
];

// TODO - GET method
app.get("/", (req, res) => {
  res.send("Hello world !!!");
});
app.get("/contact", (req, res) => {
  res.send([1, 3, 4]);
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

//Todo - Post Method
app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
  });

  const { error } = schema.validate(req.body); // Destructure the 'error' property
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//TODO - PUT Request
app.put("/api/courses/:id", (req, res) => {
  //* if the course id is equal to the stored course id then show
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  //* if not then
  if (!course) {
    res.status(404).send("This course does not exist");
    return;
  }

  // Using the validateFunction to validate the request body
  const result = validateFunction(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

function validateFunction(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course); // Return the validation result
}

//TODO - DELETE method

app.delete("/api/courses/:id", (req, res) => {
  //? Look up the course
  //? If not exist, return 404 error
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("This course does not exist. Try again.");
    return;
  }

  //? Delete the course
  const index = courses.findIndex((c) => c.id === parseInt(req.params.id));
  courses.splice(index, 1);

  // Return a message confirming the deletion
  res.send(`Course with ID ${req.params.id} has been deleted.`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
