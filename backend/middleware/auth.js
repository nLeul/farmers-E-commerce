const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


exports.routeProtection = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(400).json({ success: false, data: "Not authorized to access this route" });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded);
        req.user = await User.findById(decoded.id);
        return next();
    } catch (err) {
        return res.status(400).json({ success: false, data: "Not authorized to access this route" });
    }
};
// exports 