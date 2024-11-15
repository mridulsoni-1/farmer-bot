const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  Address: {
    type: String,
    required: true,
    trim: true,
  },
  Password: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserModel = mongoose.model("user",UserSchema);
module.exports = UserModel;
