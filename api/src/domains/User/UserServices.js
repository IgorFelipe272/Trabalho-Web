const User = require("./User");

const encryptPassword = require("../../../utils/functions/encryptPassword");

const DuplicateError = require("../../../errors/DuplicateError");
const NotFoundError = require("../../../errors/NotFoundError");

class UserServices{
    async create(body){
        const user = await User.findOne({
            where: {email: body.email}
        });
        if(user)
            throw new DuplicateError("Email já cadastrado no sistema");

        const encryptedPassword = await encryptPassword(body.password);

        const userInfo = {
            name: body.name,
            nickname: body.nickname,
            email: body.email,
            password: encryptedPassword,
            role: body.role
        }

        await User.create(userInfo);
    }

    async update(userId, body){
        const user = await User.findByPk(userId);
        if(!user)
            throw new NotFoundError("Usuário não encontrado");

        for(let attribute in body){
            user[attribute] = body[attribute];
        }

        await user.save();
    }
}

module.exports = new UserServices;