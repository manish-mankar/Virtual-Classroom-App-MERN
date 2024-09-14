import React, {useState}from 'react';
import './Popup.css';
import axios from 'axios';

const Popup = ({ onClose }) => {
    const [classCode, setClassCode] = useState('');
    const handleClassCodeChange = (e) => {
        setClassCode(e.target.value);
    };

  const handleCancel = () => {
    onClose();
  };

  const handleJoin = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_PATH_URL}/joinclass`,
        { classCode },
        { withCredentials: true }
      );
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
          <h2>Join Class</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="popup-body">
          <label htmlFor="classCode">Class Code:</label>
          <input
            type="text"
            id="classCode"
            value={classCode}
            onChange={handleClassCodeChange}
          />
        </div>
        <div className="popup-footer">
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="join-button" onClick={handleJoin}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
