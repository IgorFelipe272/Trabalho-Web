const User = require("../User/User");
const Game = require("./Game");
const GameUser = require("../GameUser/GameUser");

const QueryError = require("../../../errors/QueryError");

class GameServices{
    async create(body){
        const usersData = body.usersData;
        if(!Array.isArray(usersData) || usersData.length === 0)
            throw new QueryError("Nenhum usuário selecionado");

        const gameInfo = {
            title: body.title,
            itchLink: body.itchLink,
            releaseDate: body.releaseDate,
            image: body.image
        };

        const usersIds = usersData.map(u => u.id);
        const linkedUsers = await User.findAll({
            where: {id: usersIds}
        });

        if(linkedUsers.length !== usersData.length)
            throw new QueryError("Um dos usuários não foi encontrado");

        const newGame = await Game.create(gameInfo);

        for(const user of linkedUsers){
            const userRole = usersData.find(u => u.id === user.id);

            await newGame.addUser(user, {through: {role: userRole.role}});
        }
    }
}

module.exports = new GameServices;