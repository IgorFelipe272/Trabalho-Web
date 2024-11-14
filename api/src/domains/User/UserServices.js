//O services de cada domínio é onde as funções que fazem as coisas serão criadas, como função para criar, atualizar, remover, calcular algo...
const User = require("./User");

//Importa a função para criptografar senhas
const encryptPassword = require("../../../utils/functions/encryptPassword");

//Importa os erros lançados nas funções
const DuplicateError = require("../../../errors/DuplicateError");
const NotFoundError = require("../../../errors/NotFoundError");

//Cria uma class para o services deste domínio
class UserServices{
    async create(body){
        //Usa a função findOne do sequelize para achar um elemento no banco de dados onde email = o email do body
        //Se já existir um usuário que tem o email então lança (throw) um erro. Este erro será capturado (catch) nas rotas no index
        const user = await User.findOne({
            where: {email: body.email}
        });
        if(user)
            throw new DuplicateError("Email já cadastrado no sistema");
        
        //criptografa a senha
        const encryptedPassword = await encryptPassword(body.password);

        const userInfo = {
            name: body.name,
            nickname: body.nickname,
            email: body.email,
            password: encryptedPassword,
            role: body.role
        }
        
        //Usa a função create do sequelize para criar um novo elemento no banco de dados
        await User.create(userInfo);
    }

    async update(userId, body){
        const user = await this.getById(userId);
        
        //Atualiza o valor de cada atributo do elemento de acordo com os atributos no body
        //Se no body só tiver dois atributos (nome, email), por exemplo, então somente esses valores serão atualizados
        for(let attribute in body){
            user[attribute] = body[attribute];
        }

        //Usa a função save do sequelize para salvar os valores desse elemento no banco de dados
        await user.save();
    }

    async delete(userId){
        const user = await this.getById(userId);

        await user.destroy();
    }

    async getById(userId){
        //Usa a função findByPk do sequelize para achar um elemento no banco de dados que tem a mesma chave primária (no nosso caso o id) que a passada como parâmetro
        //Se não existir um usuário que tem o mesmo id então lança (throw) um erro. Este erro será capturado (catch) nas rotas no index
        const user = await User.findByPk(userId);
        if(!user)
            throw new NotFoundError("Usuário não encontrado");

        return user;
    }

    async getAll(){
        const users = await User.findAll();
        if(!users)
            throw new NotFoundError("Nenhum usuário cadastrado");

        return users;
    }
}

//Exporta a referência à classe com as funções
module.exports = new UserServices;