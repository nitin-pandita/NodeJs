const express = require("express");
const app = express();
const courses = [
  { id: 1, course: "course1" },
  { id: 2, course: "course2" },
  { id: 3, course: "course3" },
];
app.get("/", (req, res) => {
  res.send("Hello world !!!");
});
// creating another request
app.get("/contact", (req, res) => {
  res.send([1, 3, 4]);
});

// TODO - HTTP GET Request
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res
      .status(404)
      .send("The course that you are trying to find is not available");
  }
  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
