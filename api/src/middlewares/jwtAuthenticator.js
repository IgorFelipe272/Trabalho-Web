const jwt = require("jsonwebtoken");
const PermissionError = require("../../errors/PermissionError");

function jwtAuthenticator(req, res, next){
    try{
        const token = req.cookies["jwt"];

        if(!token)
            throw new PermissionError("É necessário logar primeiro");

        const user = jwt.verify(token, process.env.JWT_KEY);

        req.user = user;

        next();
    }catch(error){
        next(error);
    }
}

function notLoggedIn(req, res, next){
    try{
        const token = req.cookies["jwt"];

        if(token){
            const user = jwt.verify(token, process.env.JWT_KEY);

            throw new PermissionError(`Você já está logado como: ${user.name}`);
        }

        next();
    }catch(error){
        next(error);
    }
}

module.exports = {jwtAuthenticator, notLoggedIn};