import React from 'react';
import Helpful from './Helpful.jsx';
import Answers from './Answers.jsx';
import MoreAnswers from './MoreAnswers.jsx';

const Question = ({ question }) => {
  let answerKey = Object.keys(question.answers);
  let answerList = answerKey.map(Ans => question.answers[Ans]);

  return (
    <div style={{
      marginTop: '10px'
    }}>

      <span className='question' style={{
        display: 'flex',
        fontSize: '20px',
        fontWeight: 'bold',
        justifyContent: 'space-between',
        overflowWrap: 'anywhere'
      }}>Q: {question.question_body}
      </span>

      <div>

      </div>
      {answerList.map(answer => (
        <Answers key={answer.id} answer={answer} />
      ))}

    </div>
  );
};

export default Question;