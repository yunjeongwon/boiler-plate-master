const express = require("express");
const app = express();
const config = require("./config/key");
const bodyParser = require("body-parser");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected.."))
  .catch((err) => console.log(err));

app.set("port", process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return console.log(err);
    if (!user) return res.json({ registerSuccess: false });
    console.log("registered user data ==>", user);
    res.json({ registerSuccess: true });
  });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return console.log(err);
    if (!user) return res.json({ loginSuccess: false });
    user.comparePwd(req.body.password, (err, isMatch) => {
      if (err) return console.log(err);
      if (!isMatch) return res.json({ loginSuccess: false });
      user.generateToken((err, user) => {
        if (err) return console.log(err);
        if (!user) return res.json({ loginSuccess: false });
        console.log("Login Success!!!", user);
        res
          .cookie("x_auth", user.token)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", authMiddleware, (req, res) => {
  res.json({
    isAuth: true,
    isAdmin: req.user.role === 0 ? false : true,
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    token: req.token,
  });
});

app.get("/api/users/logout", authMiddleware, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id, token: req.token },
    { token: "" },
    (err, user) => {
      if (err) return console.log(err);
      if (!user) return res.json({ logoutSuccess: false });
      console.log("Logout Success!!!", user);
      res.json({ logoutSuccess: true });
    }
  );
});

app.use((req, res, next) => {
  const err = new Error(`${req.methods} ${req.url} 라우터가 없어`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 접속");
});
