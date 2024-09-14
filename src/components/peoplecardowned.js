import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const PeopleCardowned = ({ participant, onDelete }) => {
  const { _id, firstName, lastName, username } = participant;

  const handleEmailClick = () => {
    window.location.href = `mailto:${username}`;
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Are you sure you want to remove this member from the class?');
    if (confirmDelete) {
      onDelete(_id);
    }
  };
  console.log("i'm here");
  return (
    <div className="people-feed">
      <h3>{`${firstName} ${lastName}`}</h3>
      <div className="email-icon" onClick={handleEmailClick}>
        <FontAwesomeIcon icon={faEnvelope} size="2x" />
      </div>
      <div className="delete-icon" onClick={handleDeleteClick}>
        <FontAwesomeIcon icon={faTrashAlt} size="2x" />
      </div>
    </div>
  );
};

export default PeopleCardowned;
