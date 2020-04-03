const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: { type: String, required },
  messageList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
});

const chatAppDB = mongoose.connection.useDb("chat_app_db");

const Group = chatAppDB.model("Group", groupSchema);

module.exports = Group;
