const Joi = require("joi"); // Import Joi module correctly
const express = require("express");
const app = express();
app.use(express.json());
const courses = [
  { id: 1, course: "course1" },
  { id: 2, course: "course2" },
  { id: 3, course: "course3" },
];
app.get("/", (req, res) => {
  res.send("Hello world !!!");
});
app.get("/contact", (req, res) => {
  res.send([1, 3, 4]);
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
