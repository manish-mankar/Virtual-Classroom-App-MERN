import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import './card.css'; // Import the CSS file for styling
// {classid,title,description,section,owner}
const Card = (props) => {
   //console.log(props);
   const [data,setdata] = useState(props.classData)
   let linkTo = `/c/${props.classData.id}`;
   if (props.state === 'owned') {
     linkTo = `/c/o/${props.classData.id}`;
   }
 
   return (
     <div className="card">
       <Link to={linkTo}>
         <h2 className="card-title">{props.classData.classTitle}</h2>
       </Link>
       <p className="card-description">{props.classData.classDesc}</p>
       <div className="card-footer">
         <span className="card-owner">Owner: {props.classData.classOwner}</span>
         <span className="card-section">Section: {props.classData.classSection}</span>
       </div>
     </div>
   );
 };

export default Card;
