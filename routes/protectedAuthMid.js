const jwt = require("jsonwebtoken");

const protectedAuthMid = async (req, res, next) => {
  try {
    console.log("protectedAuthMid:::: ", req.cookies._3DDesigner_token);
    const token = req.cookies._3DDesigner_token;
    let decodedData;

    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userID = decodedData?.id;

      next();
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = protectedAuthMid;
