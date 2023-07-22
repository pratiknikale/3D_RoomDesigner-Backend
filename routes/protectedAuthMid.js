const jwt = require("jsonwebtoken");

const protectedAuthMid = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
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
