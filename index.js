const Joi = require("joi");
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

  //* Using the JOI
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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
