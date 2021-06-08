import React from 'react';
import Helpful from './QAhelpful.jsx';

const Question = (props) => (
  <div>
    <span>Q: {props.question.question_body}</span>
    <Helpful report={'report'}/>

    <div>A:</div>
  </div>
);

export default Question;