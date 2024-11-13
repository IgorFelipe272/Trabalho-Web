const Sequelize = require("sequelize");
const database = require("../../../config/database");

const userRoles = require("../../../utils/constants/userRoles");

const User = database.define("User", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    nickname: {
        type: Sequelize.STRING,
        allowNull: true
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    role: {
        type: Sequelize.ENUM,
        values: [userRoles.PRESIDENT, userRoles.DIRECTOR, userRoles.MEMBER, userRoles.GUEST]
    }
});

module.exports = User;