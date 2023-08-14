const express = require('express');
const router = express.Router();
const courses = [
  { id: 1, course: "course1" },
  { id: 2, course: "course2" },
  { id: 3, course: "course3" },
  { id: 4, course: "course4" },
];

// TODO - GET method

router.get("/contact", (req, res) => {
  res.send([1, 3, 4]);
});

router.get("/", (req, res) => {
  res.send(courses);
});

//Todo - Post Method
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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


module.export = courses;