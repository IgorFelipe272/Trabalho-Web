import React, { useEffect, useState } from "react";
import { login, logout } from "../services/user";

import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast} from 'react-toastify';
import 'boxicons'

import "../styles/LoginPage.css"
import "react-toastify/dist/ReactToastify.css";
import MAINLOGO from "../assets/logos/MAIN.png"

export default function LoginContainer(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [fadeUp, setFadeUp] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout( () => {
            setFadeUp(true);
        },100);
        return () => clearTimeout(timer);
    }, []);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const submitLogin = async (event) => {
        event.preventDefault();
        try {
            await login(email, password)
            navigate('/'); 
            await logout(email, password); //deslogando em seguida apenas para testar, pq se não o cookie fica armazenado e não da pra logar denovo depois com outro usuário
        }
        catch(error){
            if(error.response)
                toast.error(error.response.data);
        }
    };

    const handleCreateRedirect = () => {
        if(!token){
            // navigate('/');
        }
    };

    return(
        <div className="loginBody"> 
            <div className={`loginContainer ${fadeUp ? "fade-up" : ""}`}>
                <div className="mainWelcomeDiv">
                    <img src={MAINLOGO} className="logo"></img>
                    <h1>Olá, bem vindo!</h1>
                    <p>Não tem conta?</p>
                    <button onClick={handleCreateRedirect}>Registrar</button>
                </div>
                <div className="mainLoginDiv">
                    <h1>Login</h1>
                    <form className="formLogin" onSubmit={submitLogin}>
                        <section className="emailSection">
                            <input type="text" id="email" placeholder="Email" value={email} required onChange={(e) => {
                                setEmail(e.target.value);
                            }}/>
                            <box-icon type='solid' name='envelope' size="22px"></box-icon>
                        </section>

                        <section className="passwordSection">
                            <input type={showPassword ? "text" : "password"} id="password" placeholder="Senha" value={password} required onChange={(e) => {
                                setPassword(e.target.value);
                            }} />
                            <box-icon type='solid' name={showPassword ? "lock-open" : "lock"} onClick={togglePassword} id="lockIcon" size="22px"></box-icon>  
                        </section>

                        <button type='submit'>Login</button>
                    </form>
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