import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './classdetails.css';
import CenteredNavbar from '../components/navbar2';
import StreamComponent from '../components/streamowner';
import WorkComponent from '../components/work';
import PeopleComponent from '../components/peopleowned';

const ClassPageowned = (props) => {
  const { id } = useParams(); // Get the class ID from the URL params
  const [activeLink, setActiveLink] = useState('stream'); // Active link state
  const [classData, setClassData] = useState(null); // Class data state
  const [participantDetails, setParticipantDetails] = useState([]); // Participant details state
  const [err, setErr] = useState(null); // Error state
console.log(classData);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  // console.log(participantDetails);
  const deleteMember = async (memberId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_PATH_URL}/class/${id}/participants/${memberId}`, {
        withCredentials: true,
      });

      // Update the participant details state by removing the deleted member
      setParticipantDetails(participantDetails.filter((participant) => participant._id !== memberId));
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };


  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PATH_URL}/class/owner/${id}`, {
          withCredentials: true,
        });
        const data = response.data;
        
        setClassData(data.classData);
        setParticipantDetails(data.participants);
        // console.log(data.participants);
      } catch (error) {
        console.error('Error fetching class data:', error);
        setErr(error.response?.data.message || 'Failed to fetch class data.');
      }
    };

    fetchClassData();
  }, [id]);

  const updateClassDetails = async (updatedDetails) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_PATH_URL}/class/${id}`, updatedDetails, {
        withCredentials: true,
      });
      const updatedClass = response.data.updatedClass;
      setClassData(updatedClass);
    } catch (error) {
      console.error('Error updating class details:', error);
    }
  };




  return (
    <div className="class-page">
      <CenteredNavbar activeLink={activeLink} handleLinkClick={handleLinkClick} userdata={props.userdata} setloginstatus={props.setloginstatus} />
      {err ? (
        <p>{err}</p>
      ) : (
        activeLink === 'stream' && <StreamComponent classData={classData} userdata={props.userdata} updateClassDetails={updateClassDetails} />
      )}
      {activeLink === 'work' && <WorkComponent classData={classData} />}
      {activeLink === 'people' && <PeopleComponent participantDetails={participantDetails} classData={classData} deleteMember={deleteMember} />}
    </div>
  );
};

export default ClassPageowned;
