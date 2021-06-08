import React from 'react';
import Helpful from './QAhelpful.jsx';

const Answers = (props) => (
  <div>
    <div>A: {props.answer.body}</div>
    <p>by {props.answer.answerer_name}, {props.answer.date.substring(0, 10)} | </p>
    <Helpful helpfulness={props.answer.helpfulness} report='Report' />
  </div>
);

export default Answers;