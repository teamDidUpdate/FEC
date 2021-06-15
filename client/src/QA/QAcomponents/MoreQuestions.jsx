import React, { useState } from 'react';
import Question from './Question.jsx';

const MoreQuestions = ({ questions }) => {
  const [collapseQuestions, setCollapseQuestions] = useState(true);

  return (
    <div className='more-answered-questions-button'>
      {
        collapseQuestions
          ? <div>
            <button className='more-questions'
              onClick={() => {
                setCollapseQuestions(!collapseQuestions);
              }}>
           More Answered Questions
            </button>
          </div>
          : <div>
            {questions.slice(4).map((question) => {
              return (
                <Question question={question} key={question.question_id} />
              );
            })}
            <div>
              <button className='more-questions'
                onClick={() => {
                  setCollapseQuestions(!collapseQuestions);
                }}>
                Collapse Questions
              </button>
            </div>
          </div>
      }
    </div>
  );
};

export default MoreQuestions;