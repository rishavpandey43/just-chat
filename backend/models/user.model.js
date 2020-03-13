const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 20
    },
    firstName: { type: String },
    lastName: { type: String }
  },
  {
    timestamps: true
  }
);

userSchema.plugin(passportLocalMongoose);

const chatAppDB = mongoose.connection.useDb("chat_app_db");

const User = chatAppDB.model("User", userSchema);

module.exports = User;
