const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userAuth = express.Router();
let users = require("../modals/users");
// const auth = require("../middleware/auth");

userAuth.post("/signup", async (req, res) => {
    try {
        const firstName = req.body.FirstName;
        const lastName = req.body.LastName;
        const email = req.body.Email;
        const password = req.body.Password;
        console.log(firstName, lastName, email, password);
        const existUser = await users.findOne({ email });
        if (existUser) return res.status(400).json({ message: "email already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const saveUser = async () => {
            const newUser = new users({
                firstName: req.body.FirstName,
                lastName: req.body.LastName,
                email: email,
                password: hashedPassword,
            });

            const result = await newUser.save();
            const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1d" });
            res.status(200).json({ result, token });
        };

        saveUser();
    } catch (err) {
        console.log(err);
    }
});

userAuth.post("/login", async (req, res) => {
    try {
        const email = req.body.Email;
        const password = req.body.Password;
        const result = await users.findOne({ email });

        console.log(email, password);
        if (!result) return res.status(404).json({ message: "no user found" });

        const isPasswordCorrect = await bcrypt.compare(password, result.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ email: email, id: result._id }, "test", { expiresIn: "1d" });
        res.status(200).json({ result, token });
    } catch (err) {
        res.status(500).json({ message: "something went wrong" });
        console.log(err);
    }
});

module.exports = userAuth;