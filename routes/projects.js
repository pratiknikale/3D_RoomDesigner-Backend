const express = require("express");
const projectRoute = express.Router();
// const users = require("../modals/users");
const project = require("../modals/project");
const element = require("../modals/elements");
const protected = require("./protectedAuthMid");
// const auth = require("../middleware/auth");

projectRoute.get("/getSelectedProjDetails/:id", protected, async (req, res) => {

    console.log("/getSelectedProjDetails/:id", req.params.id)
    try {

        const projectDetails = await project.findById(req.params.id).populate("elements.Floor").populate("elements.Wall");

        if (projectDetails) {
            res.status(200).send(projectDetails);
        } else {
            throw new Error;
        }
    } catch (err) {
        console.log("something went wrong while getSelectedProjDetails::: ", err)
    }
})

projectRoute.get("/allProjectList", protected, async (req, res) => {
    try {
        const allProjectList = await project.find({ user: req.userID });
        res.status(200).send(allProjectList);
    } catch (err) {
        res.status(400).json({ message: "something went wrong in getting projectList from DB" });
        console.log("something went wron in getting project list:::: ", err);
    }
});

projectRoute.post("/newProject", protected, async (req, res) => {
    // console.log("protectedCheckJWT API:::: ", req.userID);
    // res.status(200).json({ message: "protected route is accessed" });
    try {

        const newDefaultElement = new element({
            elementType: "Floor",
            material: "",
            color: "lightgrey",
            visible: true,
            length: 12,
            width: 12,
            height: 0,
            positionX: 0,
            positionY: 0,
            positionZ: 0,
        })


        await newDefaultElement.save().then(async (result) => {
            const newProj = new project({
                user: req.userID,
                projectName: req.body.projectName,
                projectType: req.body.projectType,
                elements: { [newDefaultElement.elementType]: newDefaultElement }
            });
            await newProj.save().then(async (result) => {
                // let createdTask = await project.findOne({ user: req.userID }).populate("user", "_id firstName lastName");
                res.status(200).send(result);
            });
        });

    } catch (err) {
        console.log("something went wrong:::: ", err);
        res.status(400).send()
    }
});

projectRoute.delete("/deleteProject/:id", async (req, res) => {
    try {
        const resultData = await project.findByIdAndRemove(req.params.id);
        res.status(200).send(resultData._id);
    } catch (err) {
        console.log(err);
    }
});

module.exports = projectRoute;
