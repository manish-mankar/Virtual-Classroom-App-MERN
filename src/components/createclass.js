import React,{useState} from 'react';
import './Popup.css';
import axios from 'axios';

const CreateClassPopup = ({ onClose  }) => {

    const [classTitle, setClassTitle] = useState('');
  const [classYear, setClassYear] = useState('');
  const [classSection, setClassSection] = useState('');
  const [classDesc, setClassDesc] = useState('');
  const [classCode, setClassCode] = useState('');

  const handleCreateClass = async () => {
    try {
        const classData ={
            classTitle: classTitle,
            classYear: classYear,
            classSection: classSection,
            classDesc: classDesc,
            classCode: classCode
        }
      const response = await axios.post(`${process.env.REACT_APP_PATH_URL}/createclass`, classData, {
        withCredentials: true
      });
      // Handle response if needed
      console.log(response);
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
          <h2>Create Class</h2>
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

          <label htmlFor="classCode">Class Code:</label>
          <input
            type="text"
            id="classCode"
            value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
          />
        </div>
        <div className="popup-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="create-btn" onClick={handleCreateClass}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateClassPopup;
