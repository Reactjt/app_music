const jwt = require("jsonwebtoken");

 

exports.getToken = async (email, user) => {
    if (!user || !user._id) {
        throw new Error("Invalid user object or missing _id property");
    }

    const token = jwt.sign(
        { identifier: user._id },
        "SecretKey"
    );

    return token;
};

module.exports = exports;
