import React, { useState } from 'react';
import Answers from './Answers.jsx';

const MoreAnswers = ({ answer, answerList }) => {
  const [collapseAnswers, setCollapseAnswers] = useState(true);

  return (
    <div data-testid='more-answer-test'>
      {
        collapseAnswers
          ? <>
            <button className='more-answers'
              onClick={() => {
                setCollapseAnswers(!collapseAnswers);
              }}>
           More Answers
            </button>
          </>
          : <>
            {answerList.slice(2).map((answer) => {
              return (
                <Answers answer={answer} key={answer.id} />
              );
            })}
            <div>
              <button className='more-answers'
                onClick={() => {
                  setCollapseAnswers(!collapseAnswers);
                }}>
                Collapse Answers
              </button>
            </div>
          </>
      }
    </div>
  );
};

export default MoreAnswers;