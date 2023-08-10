const express = require("express");
const elementsRoute = express.Router();
const element = require("../modals/elements");
const project = require("../modals/project");
const protected = require("./protectedAuthMid");

elementsRoute.put("/updateFloor", protected, async (req, res) => {

    console.log("/updateFloor", req.body.floorID)
    try {

        const updatedFloor = await element.updateOne({ _id: req.body.floorID },
            {
                length: req.body.length,
                width: req.body.width,
                material: req.body.material,
            });

        if (updatedFloor) {
            res.status(200).send(updatedFloor);
        } else {
            throw new Error;
        }
    } catch (err) {
        console.log("something went wrong while getSelectedProjDetails::: ", err)
    }
});

elementsRoute.put("/updateWall", protected, async (req, res) => {
    try {
        const reqWallArray = req.body.walls;
        const projectID = req.body.projectID;

        let resultUpdatedArray = [];
        for (let i = 0; i < reqWallArray.length; i++) {
            if (reqWallArray[i]._id) {
                const updateWall = await element.updateOne({ _id: reqWallArray[i]._id }, {
                    height: reqWallArray[i].height,
                    width: reqWallArray[i].width,
                    visible: reqWallArray[i].visible,
                    color: reqWallArray[i].color,
                    material: reqWallArray[i].material
                })
                if (updateWall) {
                    const updatedWallData = await element.findById(reqWallArray[i]._id);
                    resultUpdatedArray.push(updatedWallData)
                } else {
                    throw new Error;
                }
            } else {
                const newWallElement = new element({
                    elementType: "Wall",
                    material: reqWallArray[i].material,
                    visible: reqWallArray[i].visible,
                    color: reqWallArray[i].color,
                    length: 12,
                    width: reqWallArray[i].width,
                    height: reqWallArray[i].height,
                    positionX: 0,
                    positionY: 0,
                    positionZ: 0,
                    subElements: []
                })
                const newAddedWall = await newWallElement.save();
                if (newAddedWall) {
                    resultUpdatedArray.push(newAddedWall);
                } else {
                    throw new Error;
                }
            }
        }
        const updateProject = await project.updateOne({ _id: projectID }, {
            $set: { 'elements.Wall': resultUpdatedArray }
        })
        if (updateProject) {
            const projectWallDetails = await project.findById(projectID).populate("elements.Wall");

            res.status(200).send(projectWallDetails.elements.Wall);
        } else {
            throw new Error;
        }
    } catch (err) {
        console.log("something went wrong with update wall api::: ", err)
    }
})

module.exports = elementsRoute;
