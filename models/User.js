const mongoose = require("mongoose");

/*
const Schema = mongoose.Schema;
const { Schema } = mongoose;
both are same
*/
const { Schema } = mongoose;
const userSchema = new Schema({
  googleId: String,
});

mongoose.model("users", userSchema);
