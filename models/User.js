const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
  tokens: [String]
});

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET).toString();
  user.tokens.push(token);
  await user.save();
  return token;
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    tokens: token
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
