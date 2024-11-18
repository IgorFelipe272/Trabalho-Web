//Arquivo para configurar o express
const express = require("express")

const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:3030", "http://localhost:5173"],
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Importa os roteadores de cada elemento do sistema que possui rotas próprias e as utiliza na aplicação com app.use()
//Feito para melhorar a organização dos elementos e não juntar tudo em um arquivo só
const userRouter = require("../src/domains/User/index");
app.use("/User", userRouter);

//Importa o middleware para tratamento de erros
//faz o uso do middleware ao fim do arquivo (tem que ser após todas as outras rotas) para que o erro seja tratado após a execução das rotas
const errorHandler = require("../src/middlewares/errorHandler");
app.use(errorHandler);

//Exporta a referência à aplicação
module.exports = app;