const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/error.utils");

const expires = 24 * 60 * 60 * 1000 

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: expires
    })
};

module.exports.signUp = async (req, res) => {
    const {email, password} = req.body 

    try {
        const user = await UserModel.create({email, password});
        res.status(201).json({ user: user._id });
    }
    catch(err) {
        const errors = signUpErrors(err);
        res.status(401).send({ errors });
    }
};

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: expires });
        res.status(200).json({ user: user._id })
    }
    catch (err) {
        const errors = signInErrors(err);
        res.status(401).send({ errors });
    }
};

module.exports.logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};