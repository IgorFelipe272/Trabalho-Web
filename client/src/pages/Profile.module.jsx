import React from 'react';
import Medal from '../componentes/Medal.jsx'
import styles from '../styles/Profile.module.css'; // Importa o CSS Module para Profile

const Profile = () => {
  const userProfile = {
    profilePhoto: null,
    area: "Programação",
    github: "https://github.com/username",
    itchIo: "https://itch.io/profile",
    discord: "username#1234",
    instagram: "https://instagram.com/username",
    birthday: "01/01/2000",
    shirtSize: "M",
    medals: [
      { icon: '/images/medals/AV.png', name: "Audio visual" },
      { icon: '/images/medals/GD.png', name: "Game Desingn" },
      { icon: '/images/medals/GM.png', name: "Gestao e Marketing" },
      { icon: '/images/medals/PG.png', name: "Programação" },
      { icon: '/images/medals/dev.svg', name: "Dev-U" },
    ],
  };
  

  return (
    <div className={styles.profileContainer}>
      

      {userProfile.profilePhoto ? (
        <img src={userProfile.profilePhoto} alt="Foto do Perfil" />
      ) : (
        <div className={styles.noPhoto}>Sem Foto</div>
      )}

      <p><strong>Área:</strong> {userProfile.area}</p>
      <p><strong>GitHub:</strong> <a href={userProfile.github} target="_blank" rel="noopener noreferrer">{userProfile.github}</a></p>
      <p><strong>Itch.io:</strong> <a href={userProfile.itchIo} target="_blank" rel="noopener noreferrer">{userProfile.itchIo}</a></p>
      <p><strong>Discord:</strong> {userProfile.discord}</p>
      <p><strong>Instagram:</strong> <a href={userProfile.instagram} target="_blank" rel="noopener noreferrer">{userProfile.instagram}</a></p>
      <p><strong>Aniversário:</strong> {userProfile.birthday}</p>
      <p><strong>Tamanho da Camiseta:</strong> {userProfile.shirtSize}</p>

      <h2>Medalhas</h2>
      <div className={styles.medalList}>
        {userProfile.medals.map((medal, index) => (
          <Medal key={index} icon={medal.icon} name={medal.name} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
