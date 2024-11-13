const app = require("./config/express");

require("dotenv").config();

//Descomentar o trecho de código abaixo para atualizar o banco de dados com as mudanças feitas no código

/*(async () => {
    const database = require("./config/database");
    await database.sync({ alter: true });
})();*/

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Servidor rodando na porta ${PORT}`));