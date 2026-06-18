/**
 * @file index.jsx
 * @description Renders a comprehensive leadership roster layout for Troop 303.
 * Dynamically parses Scout and adult metadata to output responsive card grids, handling 
 * open positions and displaying structured mentorship trails.
 * 
 * @module TroopLeadership
 * @requires React
 * @requires ./styles.module.css
 */
import React from 'react';
import styles from './styles.module.css';                  // Scoped CSS Modules stylesheet managing grid properties, highlights, and fallback filters

/**
 * Structural definition representing data shapes for individual youth Scouts.
 * @typedef {Object} ScoutObject
 * @property {string} name - The identity string of the Scout.
 * @property {string} [rank] - Optional rank tier achievement metric (e.g., "Life", "Eagle").
 */

/**
 * Structural definition tracking individual mentoring personnel assignments.
 * @typedef {Object} PatrolMentor
 * @property {string} name - The identity string of the assigned advisor or counselor.
 * @property {string} [rank] - Optional rank modifier indicating youth advisor proficiency status.
 */

/**
 * Structural definition encapsulating independent patrol sub-unit configurations.
 * @typedef {Object} PatrolData
 * @property {string} patrolName - The designated public callsign of the patrol unit (e.g., "Grizzlies").
 * @property {string} [img] - Public folder asset destination reference pointing to the patrol patch emblem image.
 * @property {ScoutObject} patrolLeader - Youth profile reference data map for the elected Patrol Leader position.
 * @property {PatrolMentor} [patrolYouthMentor] - Operational link referencing appointed youth mentoring executives.
 * @property {PatrolMentor} [patrolAdultMentor] - Operational link referencing assigned adult assistant advisors.
 */

/**
 * Renders an explicit administrative or youth leadership profile component frame.
 * Conditionally renders fallback state layouts if assigned string values evaluate to empty.
 * 
 * @component
 * @public
 * @param {Object} props - Component properties.
 * @param {string} props.title - The standard position name or executive title.
 * @param {string|string[]|ScoutObject|ScoutObject[]} props.name - The assigned roster entity value block.
 * @param {string} props.description - Abstract parsing role requirements and functional field obligations.
 * @param {string} props.img - Uniform image target lookup string mapping to profile photography logs.
 * @param {string} [props.mentoredBy] - Strategic structural indicator tracking adult/youth advisor linkages.
 * @returns {React.JSX.Element} A clean layout frame displaying the designated position card.
 */
export const RoleCard = ({ title, name, description, img, mentoredBy }) => {
  let rawNameString = "";
  
  // Normalizes dynamic input typing variations down into a standard raw lookup text string
  if (typeof name === 'string') {
    rawNameString = name;
  } else if (typeof name === 'object' && name !== null && typeof name.name === 'string') {
    rawNameString = name.name;
  }

  // Sanitized safety gates to flag missing names, empty listings arrays, or structural placeholder objects
  const hasNoName = !name || rawNameString.trim() === "( Scout)" || (Array.isArray(name) && name.length === 0);
  // Evaluates state check flags to instantly discover if the leadership position is unassigned (Open)
  const isOpen = hasNoName || rawNameString.toLowerCase() === "open position";

  /**
   * Internal string compiler tracking profile assignment values.
   * @private
   * @returns {React.JSX.Element} A contextual metadata layer adjusting typography coloring parameters.
   */
  const renderNameContent = () => {
    // Condition 1: Position is vacant -> Renders a clean styled warning notification block
    if (isOpen) {
      return <div className={`${styles.nameContainer} ${styles.nameContainerOpen}`}>Open Position</div>;
    }

    // Condition 2: Multi-person position assignment input type -> Maps out an ordered roster list block
    if (Array.isArray(name)) {
      return (
        <div>
          {name.map((n, idx) => {
            // Unpacks items checks to determine if listing array nodes are objects or raw strings
            let itemText = typeof n === 'object' ? n.name : n;
            
            // Evaluates youth properties to append rank tags (e.g., "(Eagle Scout)") while avoiding "(Scout Scout)" redundancy
            let rankText = '';
            if (typeof n === 'object' && n.rank) {
              rankText = n.rank === 'Scout' ? ' (Scout)' : ` (${n.rank} Scout)`;
            }

            return (
              <div key={idx} className={styles.nameContainer}>
                {itemText}{rankText}
              </div>
            );
          })}
        </div>
      );
    }

    // Condition 3: Single assignment structure wrapped explicitly within a ScoutObject mapping layout
    if (typeof name === 'object' && name !== null) {
      let rankText = '';
      if (name.rank) {
        rankText = name.rank === 'Scout' ? ' (Scout)' : ` (${name.rank} Scout)`;
      }
      return <div className={styles.nameContainer}>{name.name}{rankText}</div>;
    }

    // Condition 4: Basic string fallback option for standard adult or singular text profiles
    return <div className={styles.nameContainer}>{name}</div>;
  };


  return (
    // Dynamic class assignment that shifts layout opacity metrics if isOpen evaluates to a true condition flag
    <div className={`${styles.roleCard} ${isOpen ? styles.roleCardOpen : ''}`}>
      {/* Structural profile patch illustration or user placeholder portrait graphic */}
      <img 
        src={img} 
        alt={title} 
        className={`${styles.cardImg} ${isOpen ? styles.cardImgOpen : ''}`} 
      />
      {/* Information text layout compartment box container */}
      <div className={styles.cardContent}>
        <h4 className={styles.titleText}>{title}</h4>
        {renderNameContent()}                             {/* Dynamically computes name layout text structures via helper loops */}
        <p className={styles.descText}>{description}</p>
        {/* Conditional rendering block overlaying youth leadership-to-adult mentoring tracking trails */}
        {mentoredBy && (
          <p className={styles.mentorSection}>
            🤝 <strong>Mentored by:</strong> {mentoredBy}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Standard content formatting container wrapper applying responsive uniform layout gaps.
 * 
 * @component
 * @public
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Component instances to stack within the matching grid rows.
 * @returns {React.JSX.Element} A layout grid container enforcing flexible spacing guidelines.
 */
export const Grid = ({ children }) => {
  // Injects structural flexbox or responsive CSS grid layout styles across child cell bundles
  return <div className={styles.grid}>{children}</div>;
};

/**
 * Handles individual patrol unit structural cards, isolating operational details, 
 * active youth leadership, and tactical mentorship trails.
 * 
 * @component
 * @public
 * @param {Object} props - Component properties.
 * @param {PatrolData} props.patrol - Aggregated data module tracing specific sub-unit tracking metrics.
 * @returns {React.JSX.Element} A separate display cell visualizing localized patrol assets.
 */
export const PatrolCard = ({ patrol }) => {
  // Guard validation parsing checks scanning patrol leader records to flag empty vacancies
  const plOpen = !patrol.patrolLeader?.name || patrol.patrolLeader.name.trim() === "";
  
  // Computes formatting logic to build the Patrol Leader's youth rank string segment
  const plRank = patrol.patrolLeader?.rank 
    ? (patrol.patrolLeader.rank === 'Scout' ? ' (Scout)' : ` (${patrol.patrolLeader.rank} Scout)`)
    : '';
    
  // Computes formatting logic to build the Troop Guide / Youth Mentor rank string segment
  const youthMentorRank = patrol.patrolYouthMentor?.rank 
    ? (patrol.patrolYouthMentor.rank === 'Scout' ? ' (Scout)' : ` (${patrol.patrolYouthMentor.rank} Scout)`)
    : '';
  
  return (
    <div className={styles.patrolCard}>
      {/* Patrol patch asset graphic (e.g., Fox, Eagle, or Wolf icon patch) */}
      <img 
        src={patrol.img} 
        alt={`${patrol.patrolName} Emblem`} 
        className={styles.patrolBadge} 
      />
      {/* Inner profile text tracking compartment container wrapper */}
      <div className={styles.cardContent}>
        <h4 className={styles.patrolHeader}>{patrol.patrolName} Patrol</h4>
        
        {/* Patrol Leader Display Field: Dynamic text switch highlighting open vacancies in red */}
        <p className={styles.patrolMetaText}>
          <strong>Patrol Leader:</strong>{' '}
          <span className={plOpen ? styles.openHighlight : styles.filledText}>
            {plOpen ? "Open Position" : `${patrol.patrolLeader.name}${plRank}`}
          </span>
        </p>
        
        {/* Youth Mentor Display Field: Lists Assigned Troop Guide or Senior Youth Advisor */}
        <p className={styles.patrolMetaText}>
          <strong>Youth Mentor:</strong> {patrol.patrolYouthMentor?.name || "None"}{youthMentorRank}
        </p>
        
        {/* Adult Mentor Display Field: Lists Assigned Assistant Scoutmaster or Patrol Counselor */}
        <p className={styles.patrolMetaTextLast}>
          <strong>Adult Mentor:</strong> {patrol.patrolAdultMentor?.name || "None"}
        </p>
      </div>
    </div>
  );
};
