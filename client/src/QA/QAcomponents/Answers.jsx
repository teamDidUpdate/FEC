import React from 'react';
import Helpful from './Helpful.jsx';
import Photos from './Photos.jsx';

const Answers = ({ answer }) => (
  <div>
    <div className='answer' style={{
      marginLeft: '10px',
      marginTop: '10px',
      marginBottom: '5px',
      fontSize: '18px',
      overflowWrap: 'anywhere'
    }}>A: {answer.body}</div>

    <div className='answer-photo'>
      {answer.photos.map((photo, id) => (
        <Photos photo={photo} key={id}/>
      ))}
    </div>

    <span className='answer-user' style={{
      marginLeft: '40px',
      color: 'GrayText'
    }}>by {answer.answerer_name}, {Date(answer.date).substring(4, 15)} | Helpful? Yes ({answer.helpfulness}) | Report
      {/* <Helpful helpfulness={answer.helpfulness} report='Report' /> */}
    </span>


  </div>
);

export default Answers;