import React from 'react';
import styles from './styles.module.css';

export const RoleCard = ({ title, name, description, img, mentoredBy }) => {
  let rawNameString = "";
  if (typeof name === 'string') {
    rawNameString = name;
  } else if (typeof name === 'object' && name !== null && typeof name.name === 'string') {
    rawNameString = name.name;
  }

  // Sanitized fallback to catch blank objects, empty strings, and empty arrays
  const hasNoName = !name || rawNameString.trim() === "" || rawNameString.trim() === "( Scout)" || (Array.isArray(name) && name.length === 0);
  const isOpen = hasNoName || rawNameString.toLowerCase() === "open position";

  const renderNameContent = () => {
    if (isOpen) {
      return <div className={`${styles.nameContainer} ${styles.nameContainerOpen}`}>Open Position</div>;
    }

    if (Array.isArray(name)) {
      return (
        <div>
          {name.map((n, idx) => {
            let itemText = typeof n === 'object' ? n.name : n;
            let rankText = (typeof n === 'object' && n.rank) ? ` (${n.rank} Scout)` : '';
            return (
              <div key={idx} className={styles.nameContainer}>
                {itemText}{rankText}
              </div>
            );
          })}
        </div>
      );
    }

    if (typeof name === 'object' && name !== null) {
      let rankText = name.rank ? ` (${name.rank} Scout)` : '';
      return <div className={styles.nameContainer}>{name.name}{rankText}</div>;
    }
    
    return <div className={styles.nameContainer}>{name}</div>;
  };

  return (
    <div className={`${styles.roleCard} ${isOpen ? styles.roleCardOpen : ''}`}>
      <img 
        src={img || "/img/unit-docs/troop-303/leadership/committee.png"} 
        alt={title} 
        className={`${styles.cardImg} ${isOpen ? styles.cardImgOpen : ''}`} 
      />
      <div className={styles.cardContent}>
        <h4 className={styles.titleText}>{title}</h4>
        {renderNameContent()}
        <p className={styles.descText}>{description}</p>
        {mentoredBy && (
          <p className={styles.mentorSection}>
            🤝 <strong>Mentored by:</strong> {mentoredBy}
          </p>
        )}
      </div>
    </div>
  );
};

export const Grid = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};

export const PatrolCard = ({ patrol }) => {
  const plOpen = !patrol.patrolLeader?.name || patrol.patrolLeader.name.trim() === "";
  const plRank = patrol.patrolLeader?.rank ? ` (${patrol.patrolLeader.rank} Scout)` : '';
  const youthMentorRank = patrol.patrolYouthMentor?.rank ? ` (${patrol.patrolYouthMentor.rank} Scout)` : '';
  
  return (
    <div className={styles.patrolCard}>
      <img 
        src={patrol.img || "/img/unit-docs/troop-303/leadership/committee.png"} 
        alt={`${patrol.patrolName} Emblem`} 
        className={styles.patrolBadge} 
      />
      <div className={styles.cardContent}>
        <h4 className={styles.patrolHeader}>{patrol.patrolName} Patrol</h4>
        <p className={styles.patrolMetaText}>
          <strong>Patrol Leader:</strong>{' '}
          <span className={plOpen ? styles.openHighlight : styles.filledText}>
            {plOpen ? "Open Position" : `${patrol.patrolLeader.name}${plRank}`}
          </span>
        </p>
        <p className={styles.patrolMetaText}>
          <strong>Youth Mentor:</strong> {patrol.patrolYouthMentor?.name || "None"}{youthMentorRank}
        </p>
        <p className={styles.patrolMetaTextLast}>
          <strong>Adult Mentor:</strong> {patrol.patrolAdultMentor?.name || "None"}
        </p>
      </div>
    </div>
  );
};
