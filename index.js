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

var allowedDomains = ["http://localhost:3000", "https://threedroomdesigner.netlify.app"];
app.use(cors({
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);

    if (allowedDomains.indexOf(origin) === -1) {
      var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }, credentials: true
}));
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
