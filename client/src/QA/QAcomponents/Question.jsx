import React from 'react';
import Helpful from './Helpful.jsx';
import Answers from './Answers.jsx';
import MoreAnswers from './MoreAnswers.jsx';

const Question = ({ question, productId }) => {
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
      }}>
        Q: {question.question_body}
        <Helpful
          productId={productId}
          helpfulness={question.question_helpfulness}
          inputText={'Add Answer'}
          questionId={question.question_id}/>
      </span>
      {
        answerList
          .slice(0, 3)
          .map((answer, count) => count > 1
            ? <MoreAnswers answerList={answerList} answer={answer} key={0}/>
            : <Answers key={answer.id} answer={answer}/>)
      }
    </div>
  );
};

export default Question;