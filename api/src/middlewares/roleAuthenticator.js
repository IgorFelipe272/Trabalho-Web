const PermissionError = require("../../errors/PermissionError");

//Middleware para checar se o usuário possui a permissão necessária para executar uma ação
function roleAuthenticator(roles){
    return (req, res, next) => {
        try{
            let isValid = false;
            
            //Percorre o array com todas as funções que são permitidas de se acessar a funcionalidade
            for(let role of roles){
                //Se o usuário possui uma dessas funções então permite o acesso
                if(req.user.role === role){
                    isValid = true;
                    break;
                }
            }
    
            if(!isValid)
                throw new PermissionError("Você não tem permissão para acessar esta funcionalidade");
                
            next();
        }
        catch(error){
            next(error);
        }
    }
}

module.exports = roleAuthenticator;