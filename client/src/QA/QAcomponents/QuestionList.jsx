import React from 'react';
import Question from './Question.jsx';

const QuestionList = ({ questions, searchInput }) => (
  // {
  //   searchInput === null
  //   ?
  // }
  <div className='question-list'>
    {questions.map(question => (
      <Question question={question} key={question.question_id}/>
    ))}
  </div>
);

export default QuestionList;