//Middleware para tratas os erros existentes no projeto
//Pega cada tipo de erro criado e os trata e envia uma resposta ao front com um código de status adequado e uma mensagem em json para ser mais fácil de entender

//Importa todos os erros criados
const QueryError = require("../../errors/QueryError");
const DuplicateError = require("../../errors/DuplicateError");
const NotFoundError = require("../../errors/NotFoundError");
const PermissionError = require("../../errors/PermissionError");

const statusCodes = require("../../utils/constants/statusCodes");

function errorHandler(error, req, res, next){
    let message = error.message;
    let status = statusCodes.INTERNAL_SERVER_ERROR;

    if(error instanceof DuplicateError)
        status = statusCodes.BAD_REQUEST;

    else if(error instanceof PermissionError)
        status = statusCodes.UNAUTHORIZED;

    else if(error instanceof NotFoundError)
        status = statusCodes.NOT_FOUND;

    else if(error instanceof QueryError)
        status = statusCodes.BAD_REQUEST;

    //envia a resposta ao front
    //mensagem em json proque fica mais bonitinho
    res.status(status).json(message);
}

module.exports = errorHandler;

//Mensagem de erro com o errorHandler aplicado:
/*
    "Usuário não encontrado"
*/ //Status code correto retornado 404 (not found)

//Mensagem de erro sem o errorHandler aplicado:
/*
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Error</title>
</head>

<body>
    <pre>NotFoundError: Usuário não encontrado<br> &nbsp; &nbsp;at UserServices.getById (C:\VsCode\Trabalho-Web\api\src\domains\User\UserServices.js:61:19)<br> &nbsp; &nbsp;at process.processTicksAndRejections (node:internal/process/task_queues:95:5)<br> &nbsp; &nbsp;at async C:\VsCode\Trabalho-Web\api\src\domains\User\index.js:63:22</pre>
</body>

</html>
*/ //Status code incorreto retornado 500 (Internal Server Error)