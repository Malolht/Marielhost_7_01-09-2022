module.exports.signInErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message.includes("email"))
        errors.email = "Email incorrect";

    if (err.message.includes("password"))
        errors.password = "Mot de passe incorrect";

    return errors
};

module.exports.signUpErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message.includes("`email` is invalid"))
        errors.email = "Email invalide";

    if (err.message.includes("`email` (``) is shorter"))
        errors.email = "Email invalide";

    if (err.message.includes("expected `email` to be unique"))
        errors.email = "Cet email est déjà utilisé";

    if (err.message.includes("password"))
        errors.password = "Le mot de passe doit contenir au moins 6 caractères";

    return errors
};
