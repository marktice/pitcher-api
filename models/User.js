const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

// Statics
UserSchema.statics.findByCredentials = async function(email, password) {
  const User = this;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error();
    }
    const res = await bcrypt.compare(password, user.password);
    if (!res) {
      throw new Error();
    } else {
      return user;
    }
  } catch (error) {
    return Promise.reject('Incorrect email or password');
  }
};

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return Promise.reject('Could not verify');
  }

  return User.findOne({
    _id: decoded._id,
    tokens: token
  });
};

// Pre save
UserSchema.pre('save', function(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
