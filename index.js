const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world !!!");
});
// creating another request
app.get("/contact", (req, res) => {
  res.send([1, 3, 4]);
});
//? Setting the Environment Port
const port = process.env.PORT || 3000;

//* If the port value was giving then that will be set otherwise the hardcoded 3000 value will be used for the port

app.listen(port, () => console.log(`Listening on port ${port}`));
