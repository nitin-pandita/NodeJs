const express = require("express");
const app = express();

//* Adding the middle wear
app.use(express.json());
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

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// TODO - HTTP Post request
app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name, //* requesting from the user
  };
  courses.push(course); //* pushing the new course to the courses array
  res.send(course); //* sending the course
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
