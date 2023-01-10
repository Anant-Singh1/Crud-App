const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();
const Port = 3000;

// Database Connection

connectDB();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(express.static("uploads"));

// set template engine
app.set("view engine", "ejs");

// route prefix
app.use("/", require("./routes/routes"));

app.listen(Port, () => {
  console.log(`SERVER RUNNING ON PORT-->${Port}`);
});
