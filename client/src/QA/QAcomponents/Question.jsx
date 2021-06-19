import React from 'react';
import QuestionHelpful from './QuestionHelpful.jsx';
import Answers from './Answers.jsx';
import MoreAnswers from './MoreAnswers.jsx';

const Question = ({ question, productId }) => {
  let answerKey = Object.keys(question.answers);
  let answerList = answerKey.map(Ans => question.answers[Ans]);

  return (
    <div className='question' data-testid='individual-question-test'>
      <span className='question-control'>
        Q: {question.question_body}
        <QuestionHelpful
          questionBody={question.question_body}
          productId={productId}
          helpfulness={question.question_helpfulness}
          questionId={question.question_id}
        />
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