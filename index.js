const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

const port = process.env.PORT || 5000;

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Database connected"));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send({
    name: "harshit kishor",
    email: "harshitkishor2@gmail.com",
    age: 25,
    hint: "for next page u can visit from this given link..",
    link: "https://afternoon-thicket-97788.herokuapp.com/auth/google",
  });
});
require("./routes/authRoutes")(app);
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
