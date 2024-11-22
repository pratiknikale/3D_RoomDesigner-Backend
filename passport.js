// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");

// const jwt = require("jsonwebtoken");
// const users = require("./modals/users");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/userAuth/google/callback",
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, cb) => {
//       //   console.log(firstName, lastName, email);
//       //   done(null, profile);
//       // User.findorCreate({googleId: profile.id}, (err,user)=>{
//       //     return cb(err,user);
//       // })

//       try {
//         const firstName = profile.displayName.split(" ")[0];
//         const lastName = profile.displayName.split(" ")[1];
//         const email = profile.emails[0].value;
//         // const password = req.body.Password;
//         const result = await users.findOne({email});
//         if (result) {
//           const token = jwt.sign({email: result.email, id: result._id}, process.env.JWT_SECRET_KEY, {
//             expiresIn: "1d",
//           });
//           return cb(null, {result, token});
//         }

//         // const hashedPassword = await bcrypt.hash(password, 12);

//         const saveUser = async () => {
//           const newUser = new users({
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             password: "",
//           });

//           const result = await newUser.save();
//           const token = jwt.sign({email: result.email, id: result._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
//           //   res.status(200).json({result, token});
//           return cb(null, {result, token});
//         };

//         saveUser();
//       } catch (err) {
//         return cb(err, null);
//         // console.log(err);
//       }
//     }
//   )
// );

// // passport.serializeUser((user, done) => {
// //   done(null, user);
// // });

// // passport.deserializeUser((user, done) => {
// //   done(null, user);
// // });
