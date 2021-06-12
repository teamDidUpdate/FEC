import React, { useCallback, useState } from 'react';
import axios from 'axios';

const Helpful = ({ inputText, helpfulness, questionId, productId }) => {
  // State
  const [helpfulToggle = setHelpfulToggle] = useState(false);
  const [reportToggle = setReportToggle] = useState(false);

  // UseCallback on toggles
  const togglePut = () => {
    helpfulToggle
      ? console.log('already toggled')
      : axios.put('/question/helpful', { questionId: questionId })
        .then(() => setHelpfulToggle(true))
        .then(() => refresh(productId))
        .catch(err => console.log(`Err at Marked helpful in Q&A widget ${questionId} ${err}`));
  };

  // Render
  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'row'
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