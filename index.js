const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const database = require("./config/db");
const userAuthRoute = require("./routes/userAuth");
const projectsRoute = require("./routes/projects");
const elementsRoute = require("./routes/elements")
// const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./passport");
const cookieParser = require("cookie-parser");

var cors = require("cors");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose
  .connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected ");
    },
    (error) => {
      console.log("Database error: " + error);
    }
  );

// app.use(cookieSession({name: "session", keys: ["pratik"], maxAge: 24 * 60 * 60 * 100}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// Static directory path
// app.use(express.static(path.join(__dirname, "dist/CRUDapp")));

// API root
// app.use("/api", listRoute);

// Base Route
app.get("/", (req, res) => {
  res.send("hello");
  console.log("server started, base API hit and working fine!!");
});

//Routes

app.use("/userAuth", userAuthRoute);
app.use("/projects", projectsRoute);
app.use("/elements", elementsRoute);

// PORT
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log("Listening on port " + port);
});
