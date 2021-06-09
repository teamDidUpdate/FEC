import React from 'react';
import Helpful from './QAhelpful.jsx';
import Answers from './Answers.jsx';
import MoreAnswers from './MoreAnswers.jsx';

const Question = ({ question }) => {
  let answerKey = Object.keys(question.answers);
  let answerList = answerKey.map(Ans => question.answers[Ans]);

  return (
    <div>
      <span>Q: {question.question_body}</span>
      <div>

      </div>
      {answerList.map(answer => (
        <Answers key={answer.id} answer={answer} />
      ))}
    </div>
  );
};

export default Question;