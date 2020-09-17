const express = require("express");
const app = express();
require("./services/passport");
require("./routes/authRoutes")(app);
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send({
    name: "harshit kishor",
    email: "harshitkishor2@gmail.com",
    age: 25,
    hint: "for next page u can visit from this given link..",
    link: "https://afternoon-thicket-97788.herokuapp.com/auth/google",
  });
});
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
