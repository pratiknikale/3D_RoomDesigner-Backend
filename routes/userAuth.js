const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userAuth = express.Router();
const users = require("../modals/users");
const passport = require("passport");
const protected = require("./protectedAuthMid");
// const auth = require("../middleware/auth");

userAuth.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "success",
      user: req.user,
      // jwt:
    });
  }
});

userAuth.get("/login/failure", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

userAuth.get("/google", passport.authenticate("google", { scope: ["profile"] }));
userAuth.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "http://localhost:3000/DashboardPage",
    failureRedirect: process.env.FRONTEND_URL,
    session: false,
  }),
  (req, res) => {
    if (req.user) {
      if (!req.user.token) {
        res.status(400).redirect(process.env.FRONTEND_URL);
      } else {
        res.cookie("_3DDesigner_token", req.user.token, {
          secure: true,
          httpOnly: true,
          maxAge: 12 * 60 * 60 * 1000,
          sameSite: "none"
        }).cookie("3DDesigner_userProfile", req.user.result).status(200).redirect(`${process.env.FRONTEND_URL}/DashboardPage`);
      }
    }
  }
);

userAuth.post("/signup", async (req, res) => {
  try {
    const email = req.body.Email;
    const password = req.body.Password;
    // console.log(firstName, lastName, email, password);
    const existUser = await users.findOne({ email });
    if (existUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const saveUser = async () => {
      const newUser = new users({
        firstName: req.body.FirstName,
        lastName: req.body.LastName,
        email: email,
        password: hashedPassword,
      });

      const result = await newUser.save();
      const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

      res.cookie("_3DDesigner_token", token, {
        secure: true,
        httpOnly: true,
        maxAge: 12 * 60 * 60 * 1000,
        sameSite: "none"
      });
      res.status(200).json(result);
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

    // console.log(email, password);
    if (!result) return res.status(404).json({ message: "No user found" });

    const isPasswordCorrect = await bcrypt.compare(password, result.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ email: email, id: result._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    res.cookie("_3DDesigner_token", token, {
      secure: true,
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 1000,
      sameSite: "none"
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
});

userAuth.get("/logOut", async (req, res) => {
  try {
    res.clearCookie("_3DDesigner_token");
    res.clearCookie("3DDesigner_userProfile");

    res.send();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
});

userAuth.get("/protectedCheckJWT", protected, async (req, res) => {
  // console.log("protectedCheckJWT API:::: ", req.cookies._3DDesigner_token);
  res.status(200).json({ message: "protected route is accessed" });
});

module.exports = userAuth;
