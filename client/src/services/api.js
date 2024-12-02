//Arquivo para configurar a copnexão do front com o back usando axios
import axios from "axios"

//Cria uma conexão personalizada na porta onde o back está rodando
//withCredentials significa que utilizará cookies e tokens, o que fazemos para autenticar o usuário logado
const api = axios.create({
    baseURL: "http://localhost:3030",
    withCredentials: true
});


//Intercepta todas as respostas do back antes de elas serem processadas
api.interceptors.response.use(
    //Não faz nada e simplesmente segue o fluxo de execução
    (response) => {
        return response;
    },

    //Se houver um erro checa se ele é um erro do tipo de expiração do token
    //Se o token expirar o usuário terá que logar novamente (ex: quando a sessão expira no sigaa)
    (error) => {
        if(error?.response?.status === 403 && window.location.pathname !== "/loginPage"){
            window.location.pathname = "/login";
            alert("Sessão Expirada. Faça login novamente");
        }

        return Promise.reject(error);
    }
);

export default api;