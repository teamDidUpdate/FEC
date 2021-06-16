import React, { useState } from 'react';
import Question from './Question.jsx';

const MoreQuestions = ({ questions }) => {
  const [collapseQuestions, setCollapseQuestions] = useState(true);

  return (
    <div className='more-answered-questions-button'>
      {
        collapseQuestions
          ? <>
            <button className='more-questions'
              onClick={() => {
                setCollapseQuestions(!collapseQuestions);
              }}>
           More Answered Questions
            </button>
          </>
          : <>
            {questions.slice(4).map((question) => {
              return (
                <Question question={question} key={question.question_id} />
              );
            })}
            <>
              <button className='more-questions'
                onClick={() => {
                  setCollapseQuestions(!collapseQuestions);
                }}>
                Collapse Questions
              </button>
            </>
          </>
      }
    </div>
  );
};

export default MoreQuestions;