const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send({
    name: "harshit",
    age: 27,
    email: "harshit@123.com",
  });
});

 app.listen(port, () => {
     console.log(`Server started on ${port}`);
 });
