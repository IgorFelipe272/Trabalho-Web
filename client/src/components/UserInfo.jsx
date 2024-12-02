const UserInfo = ({ userFade, activeTab, userData, handleInputChange, updateInfo}) => {
    
    return (
        <div className={`userFormContainer ${userFade ? "Fade" : ""} ${activeTab === "information" ? "visible" : "hiddenUserPage"}`}>
            <h2>Informações da conta</h2>
            <form className="userForm">
                <div className="formItem">
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name" 
                        value={userData.name}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className="formItem">
                    <label htmlFor="nickname">Nickname</label>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={userData.nickname}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className="formItem">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className="formItem">
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={userData.role}
                        required
                        onChange={handleInputChange}
                    />
                </div>
            </form>
            <button onClick={(e) => {updateInfo()}}>Atualizar</button>
        </div>
    );
};

export default UserInfo