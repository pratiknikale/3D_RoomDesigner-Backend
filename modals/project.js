const mongoose = require("mongoose");

var projects = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        projectName: String,
        projectType: String,
        elements: {
            Floor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "elements",
            },
            Wall: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "elements",
            }]
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("projects", projects);