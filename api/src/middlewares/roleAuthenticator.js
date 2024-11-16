const PermissionError = require("../../errors/PermissionError");

function roleAuthenticator(roles){
    return (req, res, next) => {
        try{
            let isValid = false;
    
            for(let role of roles){
                if(req.user.role === role)
                    isValid = true;
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