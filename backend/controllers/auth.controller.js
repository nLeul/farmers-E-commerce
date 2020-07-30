const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');



exports.login = async (req, res, next) => {
    const { email, password, role } = req.body;
 //console.log(req.body)
    const user = await User.findOne({ email });
    
    if (!email || !password) {
        res.status(401).json({
            success: false,
            errMessage: "Please provide an email,password and role",
        });
        return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({ success: false, errMessage: "Invalid Username and Password" });
        return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
    });
     //console.log(token);
    res.status(200).json({ success: true, token, user });
};


exports.signup = async (req, res, next) => {
    const { email } = req.body;
    User.findOne({ email: email }).then(async (user) => {


        if (user) {
            res.json({ success: false, data: "Email already in use!" });
        } else {
            const { firstname, lastname, role, email, phone_number } = req.body;
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);
            const newUser = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                role: role,
                phone_number: phone_number
            }
            User.create(newUser)
                .then(user => res.json({ success: true, data: "created succesfully!", user }))
                .catch(err => res.json({ success: false, err }));
        }

    })

};