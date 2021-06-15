import React, { useState } from 'react';
import axios from 'axios';

const AnswerHelpful = ({ answerHelpfulness, answerDate, answerId, answerName }) => {
  const [helpfulToggle, setHelpfulToggle] = useState(false);
  const [reportToggle, setReportToggle] = useState(false);

  const handleEventPut = (event) => {
    !helpfulToggle && event.target.getAttribute('name') === 'helpful'

      ? (axios.put('/qa/questions/answer/helpful', {
        answerId: answerId,
        type: event.target.getAttribute('name'),
      })
        .then(response => console.log('+1'))
        .catch(err => console.log(err)), setHelpfulToggle(true))

      : !reportToggle && event.target.getAttribute('name') === 'report'

        ? (axios.put('/qa/questions/answer/helpful', {
          answerId: answerId,
          type: event.target.getAttribute('name'),
        })
          .then(response => console.log('+1'))
          .catch(err => console.log(err)), setReportToggle(true))

        : null;
  };
  return (
    <div className='answer-helpfulness-div' style={{
      display: 'inline-flex',
      flexDirection: 'row',
      marginLeft: '40px',
      color: 'GrayText'
    }}>
      <p>by {answerName}, {Date(answerDate).substring(4, 15)}</p>
      &nbsp;Helpful?&nbsp;
      <p
        className='answer-helpful-button'
        name='helpful'
        disabled={helpfulToggle}
        onClick={event => { handleEventPut(event); }}
        style={{
          textDecoration: 'underline',
          cursor: 'pointer'
        }}
      >Yes</p>
      &nbsp;({helpfulToggle ? answerHelpfulness + 1 : answerHelpfulness}) |
      <div
        className='answer-report'
        name='report'
        onClick={event => { handleEventPut(event); }}
        style={{
          textDecoration: 'underline',
          cursor: 'pointer'
        }}
      >&nbsp;{reportToggle ? 'Reported!' : 'Report'}</div>
    </div>
  );
};

export default AnswerHelpful;