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

module.exports = Router;