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

async function get(userId){
    const response = await api.get(`User/${userId}`);
    return response; 
}

async function update(userData){
    const response = await api.put(`User/${userData.id}`, userData);
    return response;
}

export {login, logout, get, update};