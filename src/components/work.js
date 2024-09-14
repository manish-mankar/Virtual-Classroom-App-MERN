import React from 'react';

const WorkComponent = (props) => {
  console.log(props);
  if(props.classData===null){return <div  className="class-page-data"></div>}
  return (
    <div className="class-page-data">
      <div className="work-list">
        <div className="work-feed">
          <h2>Work-Feed</h2>
          <ul>
            <li>
              <h3>New Assignment</h3>
              <p>This is a new assignment for this class.</p>
            </li>
            <li>
              <h3>Discussion</h3>
              <p>This is a discussion thread for this class.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkComponent;
