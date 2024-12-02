const Sequelize = require("sequelize");
const database = require("../../../config/database");

const Game = database.define("Game", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    image: {
        type: Sequelize.STRING,
        allowNull: false
    },

    releaseDate: {
        type: Sequelize.STRING,
        allowNull: false
    },

    itchLink: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Game;