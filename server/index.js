const express = require("express");
const app = express();
const config = require("./config/key");
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

app.post("/api/users/register", (req, res) => {});
app.post("/api/users/login", (req, res) => {});
app.get("/api/users/auth", (req, res) => {});
app.get("/api/users/logout", (req, res) => {});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트 접속");
});
