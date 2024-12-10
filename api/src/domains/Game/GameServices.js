const User = require("../User/User");
const Game = require("./Game");
const GameUser = require("../GameUser/GameUser");

const QueryError = require("../../../errors/QueryError");

const NotFoundError = require("../../../errors/NotFoundError");

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

    async delete(gameId){
        const game = await this.getById(gameId);

        const gameAssociations = await GameUser.findAll({
            where: {GameId: gameId}
        });

        for(const association of gameAssociations)
            await association.destroy();

        await game.destroy();
    }

    async update(body, gameId){
        const game = await this.getById(gameId);

        for(let attribute in body){
            if(body.hasOwnProperty(attribute))
                game[attribute] = body[attribute];
        }

        await game.save();
    }

    async getById(gameId){
        const game = await Game.findByPk(gameId);
        if(!game)
            throw new NotFoundError("Jogo não encontrado");

        return game;
    }

    async getAll(){
        const games = await Game.findAll();
        if(!games)
            throw new NotFoundError("Nenhum jogo cadastrado");

        return games;
    }

    async getMembers(gameId){
        await this.getById(gameId);

        const gameAssociations = await GameUser.findAll({
            where: {GameId: gameId}
        });

        const usersIds = gameAssociations.map(g => g.UserId);
        const gameMembers = await User.findAll({
            where: {id: usersIds},
            attributes: ["name", "role"]
        });

        return gameMembers;
    }
}

module.exports = new GameServices;