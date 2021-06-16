
import React from 'react';
import AnswerPhotos from './AnswerPhotos.jsx';
import AnswerHelpful from './AnswerHelpful.jsx';

const Answers = ({ answer }) => (
  <>
    <div className='answer'>A: {answer.body}</div>
    {answer.photos.length ? answer.photos.map((photo, id) => (
      <div className='answer-photo'>
        <AnswerPhotos photo={photo} key={id} />
      </div>
    )) : null}
    <AnswerHelpful
      answerId={answer.id}
      answerHelpfulness={answer.helpfulness}
      answerDate={answer.date}
      answerName={answer.answerer_name}
    />
  </>
);

export default Answers;