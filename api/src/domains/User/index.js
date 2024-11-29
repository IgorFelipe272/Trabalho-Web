//O index de cada domínio é onde suas rotas serão declaradas
//Importa um roteador que o domínio irá usar para colocar suas rotas
const Router = require("express").Router();

//Importa o services, mais explicado lá no arquivo
const UserServices = require("./UserServices");

//Importa uma constante com vários códigos de status comuns para http
const statusCodes = require("../../../utils/constants/statusCodes");
const {jwtAuthenticator, notLoggedIn} = require("../../middlewares/jwtAuthenticator");
const roleAuthenticator = require("../../middlewares/roleAuthenticator");
const userRoles = require("../../../utils/constants/userRoles");


//Rota post para logar
//Utiliza o middleware notLoggedIn para checar se já há um usuário logado na sessão
//Como o middleware vem antes da arrow function da rota, ele é executado antes, logo, faz a verificação antes da rota ser executada
Router.post("/login", notLoggedIn, async(req, res, next) => {
    try{ 
        const body = req.body;
        //Chama o services para processar os dados recebidos da requisição
        const token = await UserServices.login(body);

        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });
        
        res.status(statusCodes.SUCCESS).send("Login realizado com sucesso")
    }catch(error){
        next(error);
    }
});

//Rota post para deslogar
//Utiliza o middleware jwtAuthenticator cujo objetivo é checar se há um usuário logado no sistema
Router.post("/logout", jwtAuthenticator, async(req, res, next) => {
    try{ 
        const token = req.cookies["jwt"];

        if(!token)
            throw new QueryError("Não está logado");
            
        res.clearCookie("jwt");
        
        res.status(statusCodes.SUCCESS).send("Logout realizado com sucesso")
    }catch(error){
        next(error);
    }
});

//Rota post para criar um um novo elemento
Router.post("/", notLoggedIn, async(req, res, next) => {
    //O try-catch tenta capturar um erro que for lançado durante a execução do código. Todo código dentro do try será executado em uma ocasião normal,
    //caso um erro seja capturado o restante do código no try para de executar e executa o código dentro do catch
    try{ 
        const body = req.body;
        
        //Chama o services para processar os dados recebidos da requisição
        await UserServices.create(body);

        res.status(statusCodes.CREATED).send("Usuário criado com sucesso")
    }catch(error){
        //Captura o erro (error) e chama o método next que passa o erro ao próximo middleware que será executado (no caso um middleware de tratamento de erros)
        //Mais explicação sobre middlewares em arquivos de middlewares
        next(error);
    }
});

//Rota put para alterar um elemento
Router.put("/:userId", jwtAuthenticator, async(req, res, next) => {
    try{ 
        const userId = req.params.userId;

        const body = req.body;

        //Chama o services para processar os dados recebidos da requisição
        await UserServices.update(userId, body);

        res.status(statusCodes.ACCEPTED).send("Usuário alterado com sucesso")
    }catch(error){
        next(error);
    }
});

//Rota delete para remover um elemento
Router.delete("/:userId", jwtAuthenticator, async(req, res, next) => {
    try{ 
        //id do usuário que será removido
        const userId = req.params.userId;

        //Chama o services para processar os dados recebidos da requisição
        await UserServices.delete(userId,);

        res.status(statusCodes.ACCEPTED).send("Usuário removido com sucesso")
    }catch(error){
        next(error);
    }
});

//Rota get para obter um elemento
Router.get("/:userId", jwtAuthenticator, async(req, res, next) => {
    try{ 
        //id do elemento que será removido
        const userId = req.params.userId;

        //Chama o services para processar os dados recebidos da requisição
        const user = await UserServices.getById(userId);

        res.status(statusCodes.ACCEPTED).send(user);
    }catch(error){
        next(error);
    }
});

//Rota get para obter todos os elementos
Router.get("/", jwtAuthenticator, roleAuthenticator([userRoles.ADMINISTRATOR, userRoles.PRESIDENT, userRoles.DIRECTOR]), async(req, res, next) => {
    try{ 
        //Chama o services para processar os dados recebidos da requisição
        const users = await UserServices.getAll();

        res.status(statusCodes.ACCEPTED).send(users);
    }catch(error){
        next(error);
    }
});

//Exporta a referência ao roteador
module.exports = Router;