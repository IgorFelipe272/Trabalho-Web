const GameServices = require("./GameServices");

const statusCodes = require("../../../utils/constants/statusCodes");

const Router = require("express").Router();

Router.post("/", async(req, res, next) => {
    try{
        const body = req.body;

        await GameServices.create(body);

        res.status(statusCodes.CREATED).send("Jogo criado com sucesso.");
    }catch(error){
        next(error);
    }
});

Router.delete("/:id", async (req, res, next) => {
    try{    
        const gameId = req.params.id;

        await GameServices.delete(gameId);

        res.status(statusCodes.ACCEPTED).send("Jogo removido com sucesso");
    }catch(error){
        next(error);
    }
});

Router.put("/:id", async (req, res, next) => {
    try{
        const gameId = req.params.id;
        const body = req.body;

        await GameServices.update(body, gameId);

        res.status(statusCodes.ACCEPTED).send("Jogo alterado com sucesso");
    }catch(error){
        next(error);
    }
});

Router.get("/", async (req, res, next) => {
    try{
        const games = await GameServices.getAll();

        res.send(games);
    }catch(error){
        next(error);
    }
});

Router.get("/:id", async (req, res, next) => {
    try{    
        const gameId = req.params.id;

        const game = await GameServices.getById(gameId);

        res.send(game);
    }catch(error){
        next(error);
    }
});

Router.get("/members/:id", async (req, res, next) => {
    try{
        const gameId = req.params.id;

        const gameMembers = await GameServices.getMembers(gameId);

        res.send(gameMembers);
    }catch(error){
        next(error);
    }
});

module.exports = Router;