const mongoose = require("mongoose");

var users = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("users", users);