import React, { useState } from "react";
import "../styles/Cadastro.css";

export default function Cadastro() {
    const [formData, setFormData] = useState({
        //realPhoto: null,
        profilePhoto: null,
        area: "",
        github: "",
        itchIo: "",
        discord: "",
        instagram: "",
        birthday: "",
        shirtSize: "",
    });

    const [message, setMessage] = useState("");
    const [missingFields, setMissingFields] = useState([]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const {
            //realPhoto,
            profilePhoto,
            area,
            github,
            itchIo,
            discord,
            instagram,
            birthday,
            shirtSize,
        } = formData;

        // Verificar campos obrigatórios
        const missing = [];
        //if (!realPhoto) missing.push("realPhoto");
        if (!profilePhoto) missing.push("profilePhoto");
        if (!area) missing.push("area");
        if (!github) missing.push("github");
        if (!itchIo) missing.push("itchIo");
        if (!discord) missing.push("discord");
        if (!instagram) missing.push("instagram");
        if (!birthday) missing.push("birthday");
        if (!shirtSize) missing.push("shirtSize");

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

    /*

{renderLabel("realPhoto", "Foto Real do Membro")}
                <input
                    type="file"
                    id="realPhoto"
                    name="realPhoto"
                    accept="image/*"
                    onChange={handleFileChange}
                />

    */
    return (
        <div className="signup-container">
            <h1>Cadastro de Membro</h1>

            <form className="signup-form" onSubmit={handleSubmit}>
                

                {renderLabel("profilePhoto", "Foto de Perfil")}
                <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {renderLabel("area", "Área")}
                <select
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                >
                    <option value="">Selecione uma área</option>
                    <option value="GD">Game Design (GD)</option>
                    <option value="Prog">Programação (Prog)</option>
                    <option value="G">Gestão (G)</option>
                    <option value="M">Marketing (M)</option>
                    <option value="AV">Áudio Visual (AV)</option>
                </select>

                {renderLabel("github", "GitHub")}
                <input
                    type="url"
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/usuario"
                />

                {renderLabel("itchIo", "Itch.io")}
                <input
                    type="url"
                    id="itchIo"
                    name="itchIo"
                    value={formData.itchIo}
                    onChange={handleInputChange}
                    placeholder="https://usuario.itch.io"
                />

                {renderLabel("discord", "Discord")}
                <input
                    type="text"
                    id="discord"
                    name="discord"
                    value={formData.discord}
                    onChange={handleInputChange}
                    placeholder="Usuario#1234"
                />

                {renderLabel("instagram", "Instagram")}
                <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="@usuario"
                />

                {renderLabel("birthday", "Aniversário")}
                <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                />

                {renderLabel("shirtSize", "Tamanho da Camiseta")}
                <select
                    id="shirtSize"
                    name="shirtSize"
                    value={formData.shirtSize}
                    onChange={handleInputChange}
                >
                    <option value="">Selecione um tamanho</option>
                    <option value="PP">PP</option>
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                    <option value="XG">XG</option>
                </select>

                <button type="submit">Cadastrar</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
}
