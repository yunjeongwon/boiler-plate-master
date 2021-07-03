const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: 1,
    trim: true,
  },
  password: {
    type: String,
    maxlength: 100,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: String,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePwd = function (plainPwd, cb) {
  const user = this;
  bcrypt.compare(plainPwd, user.password, function (err, result) {
    if (err) return cb(err);
    cb(null, result);
  });
};

userSchema.methods.generateToken = function (cb) {
  const user = this;
  jwt.sign(JSON.stringify(user._id), "secret", (err, token) => {
    if (err) return cb(err);
    user.token = token;
    user.save((err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

userSchema.statics.findByToken = (token, cb) => {
  jwt.verify(token, "secret", function (err, decoded) {
    if (err) return cb(err);
    User.findOne({ _id: JSON.parse(decoded), token: token }, (err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
