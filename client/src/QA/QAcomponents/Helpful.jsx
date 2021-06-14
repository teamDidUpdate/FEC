import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Helpful = ({ inputText, helpfulness, questionId, productId }) => {
  // State
  const [helpfulToggle, setHelpfulToggle] = useState(false);
  const [reportToggle, setReportToggle] = useState(false);

  const togglePut = () => {
    helpfulToggle
      ? console.log('already toggled')
      : axios.put('/question/helpful', { questionId: questionId })
        .then(() => console.log('+1'))
        .catch(err => console.log(`Err at Marked helpful in Q&A widget ${questionId} ${err}`));
    setHelpfulToggle(true);
  };

  // Render
  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'row',
      fontSize: 17
    }}>
      Helpful?&nbsp;
      <p
        className='helpful-button'
        disabled={helpfulToggle}
        onClick={togglePut}
        style={{
          textDecoration: 'underline',
          cursor: 'pointer'
        }}>
        Yes
      </p>
      &nbsp;({helpfulToggle ? helpfulness + 1 : helpfulness}) | {inputText}
    </div>
  );
};

export default Helpful;