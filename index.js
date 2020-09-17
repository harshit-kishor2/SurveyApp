const express = require("express");
const app = express();
require("./services/passport");
require("./routes/authRoutes")(app);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
