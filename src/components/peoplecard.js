import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';

const PeopleCard = ({ participant}) => {
  const { firstName, lastName, username } = participant;

  const handleEmailClick = () => {
    window.location.href = `mailto:${username}`;
  };

  return (
    <div className="people-feed">
      <h3>{`${firstName} ${lastName}`}</h3>
      <div className="email-icon" onClick={handleEmailClick}>
        <FontAwesomeIcon icon={faEnvelope} size="2x" />
      </div>
    </div>
  );
};

export default PeopleCard;
