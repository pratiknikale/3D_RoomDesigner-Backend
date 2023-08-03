const mongoose = require("mongoose");

var elements = new mongoose.Schema(
    {
        elementType: String,
        material: String,
        color: String,
        length: Number,
        width: Number,
        height: Number,
        positionX: Number,
        positionY: Number,
        positionZ: Number,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("elements", elements);