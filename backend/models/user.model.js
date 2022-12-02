const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
    prenom: { type: String },
    nom: { type: String },
    fonction: { type: String },
    email: { type: String, require: true, unique: true, trim: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/], lowercase: true, minlength:1 },
    password: { type: String, require: true, maxlength: 1000, minlength: 5 },
    picture: { type: String, default: `http://localhost:5000/images/user-default.png` },
    likes: { type: [String] }
},
    {
    timestamps: true,
});

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error ("Incorrect password");
    }
    throw Error ("Incorrect email");
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);