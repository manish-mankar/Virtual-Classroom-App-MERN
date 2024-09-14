import React from 'react';
import axios from 'axios';
import './Popup.css';

const ProfilePopup = ({ onClose, user, handlelogout }) => {
  const handleCancel = () => {
    onClose();
  };
  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_PATH_URL}/logout`, { withCredentials: true });
      //setIsLoggedIn(false);
      handlelogout();
      //localStorage.setItem('isLoggedIn', false); // Update login status in local storage
    } catch (err) {
      console.log('Error logging out:', err);
    }
};
  return (
    <div className="popup">
      <div className="popup-content-profile">
        <div className="popup-header">
          <h2>User Profile</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="popup-body">
          <p><b>First Name:</b> {user.fname}</p>
          <p><b>Last Name:</b> {user.lname} </p>
          <p><b>Username:</b> {user.username} </p>
        </div>
        <div className="popup-footer">
          <button className="cancel-button" onClick={handleCancel}>
            Close
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
