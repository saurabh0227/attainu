const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'admin',
      required: true,
    },
    username: { type: String, default: null, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
