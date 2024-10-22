
const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  site: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String, required: true }
});

const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;