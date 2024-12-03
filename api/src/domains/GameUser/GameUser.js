const Sequelize = require("sequelize");
const database = require("../../../config/database");

const Game = require("../Game/Game");
const User = require("../User/User");

const memberRoles = require("../../../utils/constants/memberRoles");

const GameUser = database.define("GameUser", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },

    role: {
        type: Sequelize.ENUM,
        values: [memberRoles.AV, memberRoles.GD, memberRoles.PROG, memberRoles.GM],
        allowNull: false
    }
});

User.belongsToMany(Game, {
    through: GameUser
});

Game.belongsToMany(User, {
    through: GameUser
});


module.exports = GameUser;
