import { useState } from 'react';

import 'boxicons'

const PasswordInfo = ({ passwordFade, activeTab, setOldPassword, setNewPassword, setPassword, matchPassword, handleInputChange}) => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const toggleOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    }

    const toggleNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className={`passwordFormContainer ${passwordFade ? "Fade" : ""} ${activeTab === "password" ? "visible" : "hiddenUserPage"}`}>
            <h2>Trocar senha</h2>
            <form className="passwordForm">
                <div className="formItem">
                    <label htmlFor="newPassword">Nova senha</label>
                    <input type={showNewPassword ? "text" : "password"} id="newPassword" name="newPassword" onChange={(e) => {setNewPassword(e.target.value)}}/>
                    <box-icon type='solid' name={showNewPassword ? "lock-open" : "lock"} onClick={toggleNewPassword} id="lockIcon" size="22px"></box-icon>  
                </div>

                <div className="formItem">
                    <label htmlFor="confirmPassword">Confirme a nova senha</label>
                    <input type={showPassword ? "text" : "password"} id="password" name="password" onChange={(e) => {setPassword(e.target.value);
                    handleInputChange(e);}}/>
                    <box-icon type='solid' name={showPassword ? "lock-open" : "lock"} onClick={togglePassword} id="lockIcon" size="22px"></box-icon>  
                </div>
            </form>
            <button type="submit" onClick={(e) => {matchPassword()}}>Atualizar</button>
        </div>
    );
};

export default PasswordInfo