import React from 'react';
import Helpful from './QAhelpful.jsx';
import Answers from './Answers.jsx';

const Question = (props) => {
  let answerKey = Object.keys(props.question.answers);
  let answerList = answerKey.map(Ans => props.question.answers[Ans]);

  return (
    <div>
      <span>Q: {props.question.question_body}</span>
      {/* <Helpful report={'report'}/> */}
      {answerList.map((answer, key) => (
        <Answers key={key} answer={answer} />
      ))}
    </div>
  );
};

export default Question;