import React from 'react';
import styles from '../styles/Medal.module.css'; // Importa o CSS Module para estilizar o componente Medal

const Medal = ({ icon, name }) => {
  return (
    <div className={styles.medalContainer}>
      <img src={icon} alt={`${name} Icon`} className={styles.medalIcon} />
      <p className={styles.medalName}>{name}</p>
    </div>
  );
};

export default Medal;
