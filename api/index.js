//Arquivo usado para rodar a aplicação
//Importa o express
const app = require("./config/express");

//Importa a biblioteca dotenv para utilizar o .env
require("dotenv").config();

//O trecho do código abaixo serve para sincronizar o banco de dados utilizado com as mudanças feitas aqui no código
//Por exemplo, se eu adicioanr um novo atributo ao modelo do User (mais comentários la no arquivo) a mudança fica apenas local
//Rodar a aplicação com o código abaixo descomentado irá transferir essa mudança local para o banco de dados
//Mantenha na maioria dos casos comentado

/*(async () => {
    const database = require("./config/database");

    await database.sync({ alter: true });
    console.log("Sincronização completa!");
})();*/

//app.listen para colocar a aplicação na porta definida no .env
const PORT = process.env.PORT;
app.listen(PORT, console.log(`Servidor rodando na porta ${PORT}`));