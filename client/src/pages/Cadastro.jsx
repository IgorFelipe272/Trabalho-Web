import React, { useState } from "react";
import "../styles/Cadastro.css";

export default function Cadastro() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmaSenha: "",
        github: "",
    });

    const [message, setMessage] = useState("");
    const [missingFields, setMissingFields] = useState([]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { nome, email, senha, confirmaSenha, github } = formData;

        // Verificar campos obrigatórios
        const missing = [];
        if (!nome) missing.push("nome");
        if (!email) missing.push("email");
        if (!senha) missing.push("senha");
        if (!confirmaSenha) missing.push("confirmaSenha");
        if (!github) missing.push("github");

        if (senha !== confirmaSenha) {
            setMessage("As senhas não coincidem. Por favor, verifique.");
            return;
        }

        setMissingFields(missing);

        if (missing.length > 0) {
            setMessage("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // Limpar mensagem de erro e atualizar mensagem de sucesso
        setMessage("Cadastro realizado com sucesso!");
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

                {renderLabel("github", "GitHub")}
                <input
                    type="url"
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/usuario"
                />

                <button type="submit">Cadastrar</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
}
