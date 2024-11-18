import React, { useState } from "react";
import { submitLogin } from "./user";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (event) => {
        event.preventDefault();

        console.log("enviando os dados: " + email + " " + password);
    
        await submitLogin(email, password).catch((error) => {
            console.log(error);
        });
    };

    return(
        <>
            <form className="formLogin" onSubmit={submit}>
                <input type="text" id="email" placeholder="Email" value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }}/>

                <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />

                <button type="submit">Login</button>
            </form>
        </>
    );
}