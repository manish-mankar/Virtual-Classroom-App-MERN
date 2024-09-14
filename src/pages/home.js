import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Card from '../components/card';
import Nav from '../components/navbar'
const HomePage = (props) => {
    const [classes, setClasses] = useState([]);
    const [activeTab, setActiveTab] = useState('owned');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const endpoint = activeTab === 'owned' ? 'ownedclasses' : 'enrolledclasses';
          const response = await axios.get(`${process.env.REACT_APP_PATH_URL}/${endpoint}`, { withCredentials: true });
          const data = response.data;
  
          const extractedClasses = data.map((classObj) => ({
            id: classObj._id,
            classDesc: classObj.classDesc,
            classTitle: classObj.classTitle,
            classSection: classObj.classSection,
            classOwner: classObj.createdByName,
          }));
  
          setClasses(extractedClasses);
        } catch (error) {
          console.error('Error fetching classes:', error);
        }
      };
  
      fetchData();
    }, [activeTab]);
  
    const handleTabToggle = (tab) => {
      setActiveTab(tab);
    };
  
    return (
      <div className="home-page">
      <Nav userdata={props.userdata} setloginstatus={props.setloginstatus}/>
        <div className="toggle-buttons">
          <button
            className={activeTab === 'owned' ? 'active' : ''}
            onClick={() => handleTabToggle('owned')}
          >
            Owned Classes
          </button>
          <button
            className={activeTab === 'enrolled' ? 'active' : ''}
            onClick={() => handleTabToggle('enrolled')}
          >
            Enrolled Classes
          </button>
        </div>
        <div className="card-container">
          {classes.map((classData,index) => (
            <Card
              key={index}
              state={activeTab}
            //   classid={classData.id}
            //   title={classData.classTitle}
            //   description={classData.classDesc}
            //   section={classData.classSection}
            //   owner={classData.classOwner}
            classData={classData}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default HomePage;
  