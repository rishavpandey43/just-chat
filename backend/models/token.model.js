const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tokenSchema = Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 600 },
});

const chatAppDB = mongoose.connection.useDb('chat_app_db');

const Token = chatAppDB.model('Token', tokenSchema);

module.exports = Token;
