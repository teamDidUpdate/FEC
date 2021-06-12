import React, { useState } from 'react';

import Question from './Question.jsx';

const MoreQuestions = ({ questions }) => {
  const [collapseQuestions, setCollapseQuestions] = useState(true);

  return (
    <div>
      {
        collapseQuestions
          ? <div style={{
            gridRowStart: '4',
            gridColumnEnd: 'span 4',
          }}>
            <button style={{
              fontSize: '20px',
              marginTop: '20px',
              marginBottom: '10px'
            }}
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
              <button style={{
                fontSize: '20px',
                marginTop: '20px',
                marginBottom: '10px'
              }}
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