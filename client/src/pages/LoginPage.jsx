//Página onde o usuária realizará o login
//Atualmente feita apenas para tese
import React, { useEffect, useRef, useState } from "react";
import { login, logout } from "../services/user";

import "../styles/LoginPage.css"

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = async (event) => {
        event.preventDefault();
    
        await login(email, password).catch((error) => {
            console.log(error);
        });
    };

    const submitLogout = async (event) => {
        console.log("deslogando...");

        await logout();
    };

    return(
        <>
            <div className="loginContainer">
                <form className="formLogin" onSubmit={submitLogin}>
                    <input type="text" id="email" placeholder="Email" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>

                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }} />

                    <button type="submit">Login</button>
                </form>

                <button onClick={submitLogout}>Realizar logout</button>
            </div>
        </>
    );
}