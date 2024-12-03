import React, { useState } from "react";
import { create } from "../services/user";

import { ToastContainer, toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

import "../styles/Cadastro.css";

export default function Cadastro() {
    const [formData, setFormData] = useState({
        nome: "",
        nick: "",
        email: "",
        senha: "",
        confirmaSenha: "",
        role: "member",
    });

    const [message, setMessage] = useState("");
    const [missingFields, setMissingFields] = useState([]);

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const { nome, nick, email, senha, confirmaSenha, role } = formData;

            // Verificar campos obrigatórios
            const missing = [];
            if (!nome) missing.push("nome");
            if (!email) missing.push("email");
            if (!senha) missing.push("senha");
            if (!confirmaSenha) missing.push("confirmaSenha");
            if (!role) missing.push("role");

            if (senha !== confirmaSenha) {
                setMessage("As senhas não coincidem. Por favor, verifique.");
                return;
            }

            setMissingFields(missing);

            if (missing.length > 0) {
                setMessage("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            const userData = {
                name: nome,
                nickname: nick,
                email: email,
                password: senha,
                role: role
            }
            
            await create(userData);

            // Limpar mensagem de erro e atualizar mensagem de sucesso
            setMessage("Cadastro realizado com sucesso!");

            navigate("/login");
        }catch(error){
            if(error.response)
                toast.error(error.response.data);
        }
    };

    const renderLabel = (field, label) => {
        return (
            <label htmlFor={field}>
                {label}{" "}
                {missingFields.includes(field) && (
                    <span style={{ color: "red" }}>*</span>
                )}
            </label>
        );
    };

    return (
        <div className="signup-container">
            <h1>Cadastro de Membro</h1>

            <form className="signup-form" onSubmit={handleSubmit}>
                {renderLabel("nome", "Nome")}
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Digite seu nome"
                />

                {renderLabel("nick", "Nick")}
                <input
                    type="text"
                    id="nick"
                    name="nick"
                    value={formData.nick}
                    onChange={handleInputChange}
                    placeholder="Digite seu nick (opcional)"
                />

                {renderLabel("email", "Email")}
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Digite seu email"
                />

                {renderLabel("senha", "Senha")}
                <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleInputChange}
                    placeholder="Digite sua senha"
                />

                {renderLabel("confirmaSenha", "Confirmação de Senha")}
                <input
                    type="password"
                    id="confirmaSenha"
                    name="confirmaSenha"
                    value={formData.confirmaSenha}
                    onChange={handleInputChange}
                    placeholder="Confirme sua senha"
                />

                {renderLabel("role", "Role")}
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                >
                    <option value="member">Membro</option>
                    <option value="director">Diretor</option>
                    <option value="president">Presidente</option>
                    <option value="guest">Visitante</option>
                </select>

                <button type="submit">Cadastrar</button>
            </form>

            {message && <p className="message">{message}</p>}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
