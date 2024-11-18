import api from "./api";

async function submitLogin(email, password){
    const response = await api.post("/User/login", {email, password});
    return response;
}

export {submitLogin};