const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const database = require("./config/db");
// const listRoute = require("./routes/taskList");

// const clientUrl = require("./config/clientUrl");

var cors = require("cors");
require("dotenv").config();

// mongoose.Promise = global.Promise;
// mongoose
//   .connect(database.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(
//     () => {
//       console.log("Database sucessfully connected ");
//     },
//     (error) => {
//       console.log("Database error: " + error);
//     }
//   );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// Static directory path
// app.use(express.static(path.join(__dirname, "dist/CRUDapp")));

// API root
// app.use("/api", listRoute);

// Base Route
app.get("/", (req, res) => {
  res.send("hello");
  console.log("server started, base API hit and working fine!!");
});

// PORT
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log("Listening on port " + port);
});
