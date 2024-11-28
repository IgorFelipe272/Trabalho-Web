import React, { useEffect, useRef, useState } from "react";
import { login, logout } from "../services/user";

import { useNavigate } from 'react-router-dom'

import 'boxicons'

import "../styles/LoginPage.css"
import MAINLOGO from "../assets/logos/MAIN.png"

export default function LoginContainer(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const[showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const submitLogin = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            navigate('/'); 
        }
        catch(error){
        }

    };

    return(
        <div className="loginBody"> 
            <div className="loginContainer">
                <div className="mainWelcomeDiv">
                    <img src={MAINLOGO} className="logo"></img>
                    <h1>Olá, bem vindo!</h1>
                    <p>Não tem conta?</p>
                    <button>Registrar</button>
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
        </div>
    );
}