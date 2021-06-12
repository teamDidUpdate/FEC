import React, { useState } from 'react';

import Answers from './Answers.jsx';

const MoreAnswers = ({ answer, answerList }) => {
  const [collapseAnswers, setCollapseAnswers] = useState(true);

  return (
    <div>
      {
        collapseAnswers
          ? <div>
            <button className='more-answers'
              onClick={() => {
                setCollapseAnswers(!collapseAnswers);
              }}>
           More Answers
            </button>
          </div>
          : <div>
            {answerList.slice(2).map((answer) => {
              return (
                <Answers answer={answer} key={answer.id} />
              );
            })}
            <div>
              <button className='collapse-answers'
                onClick={() => {
                  setCollapseAnswers(!collapseAnswers);
                }}>
                Collapse Answers
              </button>
            </div>
          </div>
      }
    </div>
  );
};

export default MoreAnswers;