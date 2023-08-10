const mongoose = require("mongoose");

var elements = new mongoose.Schema(
    {
        elementType: String,
        material: String,
        color: String,
        visible: Boolean,
        length: Number,
        width: Number,
        height: Number,
        positionX: Number,
        positionY: Number,
        positionZ: Number,
        subElements: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "elements",
        }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("elements", elements);