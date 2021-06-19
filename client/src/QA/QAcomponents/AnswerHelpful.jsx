import React, { useState } from 'react';
import axios from 'axios';

const AnswerHelpful = ({ answerHelpfulness, answerDate, answerId, answerName }) => {
  const [helpfulToggle, setHelpfulToggle] = useState(false);
  const [reportToggle, setReportToggle] = useState(false);

  const convertDate = (string) => {
    return new Date(string.substring(0, 10))
      .toString()
      .substring(0, 10);
  };

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
    <div className='answer-helpfulness-div' data-testid='answer-helpful-test'>
      <>by {answerName}, {convertDate(answerDate)} |</>
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
      &nbsp;({helpfulToggle ? answerHelpfulness + 1 : answerHelpfulness}) | &nbsp;
      <div
        className='answer-report'
        name='report'
        onClick={event => { handleEventPut(event); }}
        style={{
          textDecoration: 'underline',
          cursor: 'pointer'
        }}
      >{reportToggle ? 'Reported!' : 'Report'}</div>
    </div>
  );
};

export default AnswerHelpful;