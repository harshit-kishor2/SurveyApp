const mongoose = require("mongoose");

/*
const Schema = mongoose.Schema;
const { Schema } = mongoose;
both are same
*/
const { Schema } = mongoose;
const userSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0,
  },
});

mongoose.model("users", userSchema);
