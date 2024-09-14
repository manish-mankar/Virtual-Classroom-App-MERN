import React from 'react';
import PeopleCard from './peoplecard';

const PeopleComponent = (props) => {
  console.log(props.classData);
  if(props.classData===null){return <div  className="class-page-data"></div>}
    const participant={
        firstName:props.classData.createdByName,
        lastName:'',
        username:props.classData.createdByusername
    }
  return (
    <div className="class-page-data">
      <div className="people-list">
        <h2>Owner Details</h2>
        <PeopleCard key={props.classData._id} participant={participant}/>
        <h2>Participant Details</h2>
        {props.participantDetails.map((participant) => (
          <PeopleCard key={participant._id} participant={participant} />
        ))}
      </div>
    </div>
  );
};

export default PeopleComponent;
