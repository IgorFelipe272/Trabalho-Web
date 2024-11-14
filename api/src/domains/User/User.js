//Arquivo para configurar e criar o modelo do elemento no banco de dados
//Todos os atributos que o elemento irá ter serão declarados aqui (no caso o usuário terá id, nome, nick, email...)
//O sequelize irá tratar de traduzir o nosso código em javascript para código em linguagem SQL (linguagem do banco de dados mySQL)
const Sequelize = require("sequelize");
const database = require("../../../config/database");

//Importa a constante com todas as funções que um usuário poderá ter no aplicativo
const userRoles = require("../../../utils/constants/userRoles");

//Define uma nova tabela no banco de dados com o nome entre parenteses
//As tabelas são justamentes os domínios da aplicação (nesse caso Usuário, posteriormente Jogos, etc...)
//Cada tabela terá seus elementos, que serão objetos únicos criados duratne o uso da aplicação, tipo um usuário com nick vini é um elemento da tabela User e tem os atributos id, name, email...
const User = database.define("User", {
    //Todo elemento terá um id ÚNICO que é incrementado automaticamente pelo proprio sequelize. O id funciona como a chave primária do elemento
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    nickname: {
        type: Sequelize.STRING,
        allowNull: true
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    role: {
        type: Sequelize.ENUM,
        values: [userRoles.PRESIDENT, userRoles.DIRECTOR, userRoles.MEMBER, userRoles.GUEST]
    }
});

//Exporta o modelo 
module.exports = User;