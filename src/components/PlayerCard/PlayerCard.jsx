// src/components/PlayerCard/PlayerCard.jsx
import React from 'react';
import styles from './PlayerCard.module.scss';
import shirtImage from '../../assets/greecejersey.png'; // Replace with your own image or use team-specific shirts

const PlayerCard = ({ name, points, onClick }) => {
  return (
    
    <div className={styles.playerCard} onClick={onClick}>
      <img src={shirtImage} alt="Player Shirt" className={styles.shirt} />
      <div className={styles.nameBox}>{name}</div>
      <div className={styles.pointsBox}>{points}</div>
    </div>
  );
};

export default PlayerCard;
