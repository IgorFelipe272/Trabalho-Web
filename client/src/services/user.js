//Arquivo para fazer a conexão de todas as rotas do User do back com o front
import api from "./api";

//Conecta o front com a rota de login la no back
async function login(email, password){
    const response = await api.post("/User/login", {email, password});
    return response;
}

//Conecta o front com a rota de logout la no back
async function logout(){
    const response = await api.post("User/logout");
    return response;
}

export {login, logout};