//Arquivo para configurar o sequelize, biblioteca utilizada para gerenciar o banco de dados com javascript
const Sequelize = require("sequelize");

//Dotenv é uma biblioteca que permite usar o .env, arquivo que mantém variáveis que o código usa e que não são enviadas ao github
require("dotenv").config();

//Inicia o sequelize e o conecta ao banco de dados com as variáveis de ambiente
const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    
    {
        host: process.env.DB_HOST,
        //Usa o dialeto mysl
        dialect: "mysql",
    }
);


//Exporta a referência à conexão com o banco de dados
module.exports = sequelize;