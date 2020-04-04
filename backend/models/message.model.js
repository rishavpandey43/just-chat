const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: { type: String, required: true }
},
  {
    timestamps: true
  }
);

const chatAppDB = mongoose.connection.useDb("chat_app_db");

const Message
