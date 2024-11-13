const Router = require("express").Router();

const userRoles = require("../../../utils/userRoles");
const User = require("./User");


Router.get("/", async(req, res, next) => {
    try{ 
        const userInfo = {
            name: "Vinícius de Sousa Viana",
            nickname: "ViniSapos",
            email: "vini193loka@gmail.com",
            password: "senha123",
            role: userRoles.MEMBER
        };

        await User.create(userInfo);
    }catch(error){
        next(error);
    }
});

module.exports = Router;