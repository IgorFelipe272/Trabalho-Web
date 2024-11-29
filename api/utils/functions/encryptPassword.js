//Arquivo para armazenar uma função de criptografia de senhas
//Importa a biblioteca para a função
const bcrypt = require("bcrypt");

async function encryptPassword(password){
    //n sei o q é esse saltkkkkkk
    const salt = 10;
    
    //função hash criptografa a senha
    const encryptedPassword = await bcrypt.hash(password, salt);

    return encryptedPassword;
}

module.exports = encryptPassword;