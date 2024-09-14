import React, { useState } from 'react';
import './Popup.css';
import axios from 'axios';

const PopupComponent = ({ onClose, updateClassDetails, classData }) => {
  const [classTitle, setClassTitle] = useState(classData.classTitle);
  const [classYear, setClassYear] = useState(classData.classYear);
  const [classSection, setClassSection] = useState(classData.classSection);
  const [classDesc, setClassDesc] = useState(classData.classDesc);

  const handleChangeDetails = async () => {
    try {
      const updatedDetails = {
        classTitle: classTitle,
        classYear: classYear,
        classSection: classSection,
        classDesc: classDesc,
      };

      // Call the updateClassDetails function passed as a prop
      updateClassDetails(updatedDetails);

      onClose();
    } catch (error) {
      // Handle error if needed
      console.log(error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Update Class Details</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="popup-body">
          <label htmlFor="classTitle">Class Title:</label>
          <input
            type="text"
            id="classTitle"
            value={classTitle}
            onChange={(e) => setClassTitle(e.target.value)}
          />

          <label htmlFor="classYear">Class Year:</label>
          <input
            type="text"
            id="classYear"
            value={classYear}
            onChange={(e) => setClassYear(e.target.value)}
          />

          <label htmlFor="classSection">Class Section:</label>
          <input
            type="text"
            id="classSection"
            value={classSection}
            onChange={(e) => setClassSection(e.target.value)}
          />

          <label htmlFor="classDesc">Class Description:</label>
          <textarea
            id="classDesc"
            value={classDesc}
            onChange={(e) => setClassDesc(e.target.value)}
          />
        </div>
        <div className="popup-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="save-button" onClick={handleChangeDetails}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
