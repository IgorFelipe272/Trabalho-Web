const bcrypt = require("bcrypt");

function encryptPassword(password){
    const salt = 10;

    const encryptedPassword = bcrypt.hash(password, salt);

    return encryptedPassword;
}

module.exports = encryptPassword;