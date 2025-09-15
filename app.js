require("dotenv").config();

const path = require("node:path");
const express = require("express");
const passport = require("passport");

// Import custom config
const initializePassport = require("./config/passport-config");
const authRouter = require("./src/routes/authRouter");

// Import routers

// App
const app = express();

// App config
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Configuracion por si en el futuro agrego front-end
// app.use(express.json());
// app.use(express.static(__dirname));

// Passport
initializePassport(passport);

// Routes
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/auth", authRouter);

app.listen(process.env.PORT, () =>
  console.log(`App running on port ${process.env.PORT}`)
);
