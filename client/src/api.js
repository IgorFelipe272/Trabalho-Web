import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3030",
    withCredentials: true
});

api.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        if(error?.response?.status === 403 && window.location.pathname !== "/loginPage"){
            window.location.pathname = "/loginPage";
            alert("Sessão Expirada. Faça login novamente");
        }

        return Promise.reject(error);
    }
);

export default api;