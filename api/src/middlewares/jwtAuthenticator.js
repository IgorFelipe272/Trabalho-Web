//Arquivo com middlewares responsáveis por lidar com a função de login e logout
//Importa a biblioteca responsável por gerar os tokens
const jwt = require("jsonwebtoken");

const PermissionError = require("../../errors/PermissionError");

//Função para checar se há um token (se está logado) e armazena o usuário logado na req.user
//Permite que rotas acessem a informação do usuário logado, como id, email, nome etc...
function jwtAuthenticator(req, res, next){
    try{
        //Acessa o token armazenado nos cookies do usuário
        const token = req.cookies["jwt"];

        //Se o token não existe então ninguém está logado
        if(!token)
            throw new PermissionError("É necessário logar primeiro");

        //Verifica o token e armazena as informações do usuário
        const user = jwt.verify(token, process.env.JWT_KEY);

        req.user = user;

        next();
    }catch(error){
        next(error);
    }
}

//Função para checar se já não há um usuário logado
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