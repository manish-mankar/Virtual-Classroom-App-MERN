import React , { useState, useEffect }from 'react';
import axios from 'axios';
import PeopleCardowned from './peoplecardowned';
import PeopleCard from './peoplecard';
const PeopleComponent = (props) => {
  //console.log(props.classData);
  const [userAccepting, setUserAccepting] = useState(props.classData.userAccepting);

  useEffect(() => {
    const fetchUserAcceptance = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PATH_URL}/class/${props.classData._id}/user-acceptance`, {
          withCredentials: true,
        });
        setUserAccepting(response.data.userAccepting);
      } catch (error) {
        console.error('Error fetching user acceptance:', error);
      }
    };

    fetchUserAcceptance();
  }, [props.classData]);

  const handleToggleUserAcceptance = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_PATH_URL}/class/${props.classData._id}/useracceptance`,
        { userAccepting: !userAccepting },
        { withCredentials: true }
      );
      setUserAccepting(response.data.userAccepting);
    } catch (error) {
      console.error('Error toggling user acceptance state:', error);
    }
  };
  if(props.classData===null){return <div  className="class-page-data"></div>}

  
    const participant={
        firstName:props.classData.createdByName,
        lastName:'',
        username:props.classData.createdByusername
    }
    const handleDelete = (participantId) => {
        props.deleteMember(participantId);
      };
  return (
    <div className="class-page-data">
      <div className="people-list">
        <h2>Owner Details</h2>
        <PeopleCard key={props.classData._id} participant={participant} />
        
        <div className='user-acceptance-update'>
        <button onClick={handleToggleUserAcceptance}>
          {userAccepting ? 'Stop Accepting Users' : 'Accept Users'}
        </button>
        
        </div>
        <h2>Participant Details</h2>
        {props.participantDetails.map((participant) => (
          <PeopleCardowned key={participant._id} participant={participant} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default PeopleComponent;
