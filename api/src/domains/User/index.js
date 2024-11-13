const Router = require("express").Router();

const UserServices = require("./UserServices");

const statusCodes = require("../../../utils/constants/statusCodes");

Router.post("/", async(req, res, next) => {
    try{ 
        const body = req.body;

        await UserServices.create(body);

        res.status(statusCodes.CREATED).send("Usuário criado com sucesso")
    }catch(error){
        next(error);
    }
});

Router.put("/:userId", async(req, res, next) => {
    try{ 
        const userId = req.params.userId;

        const body = req.body;

        await UserServices.update(userId, body);

        res.status(statusCodes.ACCEPTED).send("Usuário alterado com sucesso")
    }catch(error){
        next(error);
    }
});

module.exports = Router;