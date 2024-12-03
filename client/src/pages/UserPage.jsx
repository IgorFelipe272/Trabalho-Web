import { useState, useEffect } from "react";
import "../styles/UserPage.css";

import { get, update } from "../services/user.js"
import { toast, ToastContainer } from "react-toastify";

import UserInfo from "../components/UserInfo.jsx"
import PasswordInfo from "../components/PasswordInfo.jsx";

import { useNavigate } from 'react-router-dom'

export default function UserPage() {
    const [activeTab, setActiveTab] = useState("information");
    const [userFade, setUserFade] = useState(false);
    const [passwordFade, setPasswordFade] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [password, setPassword] = useState("");

    const [userData, setUserData] = useState({
        name: "",
        nickname: "",
        email: "",
        role: "",
        id: "",
        password: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const userId = sessionStorage.getItem('userId');
                
                const response = await get(userId);

                response.data.password = "";
                
                setUserData(response.data);
            }
            catch(error){
                toast.error(error.response.data);
            }
        }

        fetchUserData();
    }, [])

    const handleTabChange = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
            if (tab === "information") {
                setPasswordFade(false);
                setUserFade(true);
            }
            if (tab === "password") {
                setUserFade(false);
                setPasswordFade(true);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
       
        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));

    };

    const updateInfo = async () => {
        try{
            const response = await update(userData); //rota update para atualizar passando os dados no body
            toast.success(response.data);
        }
        catch(error){
            toast.error(error.response.data);
        }
    }

    const matchPassword = async () => {
        try{
            if(password === newPassword){
                await update(userData); //rota update para atualizar passando também senha no body
                toast.success("Senha alterada com sucesso!");
            } else {
                toast.error("As senhas não conferem");
            }
        }
        catch(error){
            toast.error(error.response.data);
        }
    }

    return (
        <div className="userBody">
            <div className="userContainer">
                <nav className="optionContainer">
                    <img
                        src="https://th.bing.com/th/id/OIP.9jp3vrVA5qHN5WLPI6ebQAHaLH?rs=1&pid=ImgDetMain"
                        alt="User"
                    />
                    <h2>{userData.name}</h2>
                    <button
                        className="buttonAccount"
                        onClick={() => handleTabChange("information")}
                    >
                        Conta
                    </button>
                    <button onClick={() => handleTabChange("password")}>
                        Senha
                    </button>
                    <button onClick={() => {navigate("/chart")}}>Gráficos</button>
                </nav>
                <div className="informationContainer">
                    <UserInfo 
                        userFade={userFade} 
                        activeTab={activeTab} 
                        userData={userData} 
                        handleInputChange={handleInputChange}
                        updateInfo={updateInfo}
                    />
                    <PasswordInfo 
                        passwordFade={passwordFade} 
                        activeTab={activeTab} 
                        userData={userData}
                        handleInputChange={handleInputChange}
                        setNewPassword={setNewPassword}
                        setPassword={setPassword}
                        matchPassword={matchPassword}
                    />
                    <button className="backButton" onClick={() => { navigate("/") }}>Voltar</button>
                </div>
            </div>
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




