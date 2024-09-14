import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './classdetails.css';
import CenteredNavbar from '../components/navbar2';
import StreamComponent from '../components/stream';
import WorkComponent from '../components/work';
import PeopleComponent from '../components/people';

const ClassPage = (props) => {
  const { id } = useParams(); // Get the class ID from the URL params
  const [activeLink, setActiveLink] = useState('stream'); // Active link state
  const [classData, setClassData] = useState(null); // Class data state
  const [participantDetails, setParticipantDetails] = useState([]); // Participant details state
  const [err, setErr] = useState(null); // Error state

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PATH_URL}/class/${id}`, {
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

  
  return (
    <div className="class-page">
      <CenteredNavbar activeLink={activeLink} handleLinkClick={handleLinkClick} userdata={props.userdata} setloginstatus={props.setloginstatus} />
      {err ? (
        <p>{err}</p>
      ) : (
        activeLink === 'stream' && <StreamComponent classData={classData} userdata={props.userdata} />
      )}
      {activeLink === 'work' && <WorkComponent classData={classData} />}
      {activeLink === 'people' && <PeopleComponent participantDetails={participantDetails} classData={classData} />}
    </div>
  );
};

export default ClassPage;
