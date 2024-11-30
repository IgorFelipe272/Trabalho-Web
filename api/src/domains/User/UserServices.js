//Importa a função para criptografar senhas
const encryptPassword = require("../../../utils/functions/encryptPassword");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
//Importa os erros lançados nas funções
const DuplicateError = require("../../../errors/DuplicateError");
const NotFoundError = require("../../../errors/NotFoundError");
const PermissionError = require("../../../errors/PermissionError");
const QueryError = require("../../../errors/QueryError");

//Importa as funções do banco de dados e configura variáveis necessárias
const DBConnection = require("../../../config/database");
const { off } = require("process");
const file = 'usuarios-db.json'


//Cria uma class para o services deste domínio
class UserServices{
    async login(body){
        const usersDB = await DBConnection.getDB(file);
        
        const user = usersDB.find(user => user.email === body.email);
        
        if(!user)
            throw new PermissionError("Email ou senha inválidos");

        const matchingPassword = await bcrypt.compare(body.password, user.password);
        
        if(!matchingPassword)
            throw new PermissionError("Email ou senha inválidos");

        const token = jwt.sign({id: user.id, name: user.name, email: user.email, role: user.role}, process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRATION});
        
        return token;
    }

    async create(body){
        //Usa a função findOne do sequelize para achar um elemento no banco de dados onde email = o email do body
        //Se já existir um usuário que tem o email então lança (throw) um erro. Este erro será capturado (catch) nas rotas no index
        
        const usersDB = await DBConnection.getDB(file);
        
        const user = usersDB.find(user => user.email === body.email);

        if(user){
            throw new DuplicateError("Email já cadastrado");
        }
        //criptografa a senha
        const encryptedPassword = await encryptPassword(body.password);
        

        const userInfo = {
            id: crypto.randomUUID(),
            name: body.name,
            nickname: body.nickname,
            email: body.email,
            password: encryptedPassword,
            role: body.role
        }
        
        
        usersDB.push(userInfo);
        await DBConnection.storeDB(file, usersDB);
    }

    async update(userId, body){
        const usersDB = await DBConnection.getDB(file);
        
        const user =  await this.getById(userId);
        
        //Se tiver a senha, encrypta ela pra atrualizar
        if(body.hasOwnProperty('password')){
            body.password = await encryptPassword(body.password);
        }
        //Atualiza o valor de cada atributo do elemento de acordo com os atributos no body
        //Se no body só tiver dois atributos (nome, email), por exemplo, então somente esses valores serão atualizados
        for(let attribute in body){
            if(body.hasOwnProperty(attribute)) //Se o body não ta vazio, atualiza
                user[attribute] = body[attribute];
        }
        
        const userIndex = usersDB.findIndex(u => u.id === userId);
        usersDB[userIndex] = user; 

        await DBConnection.storeDB(file, usersDB);
    }

    async delete(userId){
        const usersDB = await DBConnection.getDB(file);

        const user = await this.getById(userId);

        const updatedUsersDB = usersDB.filter(u => u.id !== user.id);

        await DBConnection.storeDB(file, updatedUsersDB);
    }

    async getById(userId){
        const usersDB = await DBConnection.getDB(file);

        //Se não existir um usuário que tem o mesmo id então lança (throw) um erro. Este erro será capturado (catch) nas rotas no index
        const user = usersDB.find(user => user.id === userId);
        if(!user)
            throw new NotFoundError("Usuário não encontrado");

        return user;
    }

    async getAll(){
        const users = await DBConnection.getDB(file);
        if(!users)
            throw new NotFoundError("Nenhum usuário cadastrado");

        return users;
    }

    async match(password, userId){
        const user = await this.getById(userId);
        
        const matchingPassword = await bcrypt.compare(password, user.password);
        
        if(!matchingPassword){
            throw new PermissionError("Senha incorreta");
        }
            
        return true;
    }
}

//Exporta a referência à classe com as funções
module.exports = new UserServices;