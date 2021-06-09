import React from 'react';
import Question from './Question.jsx';

const QuestionList = ({ questions }) => (
  <div style={{gridColumnStart: 'span 3'}}>
    {questions.map(question => (
      <Question question={question} key={question.question_id}/>
    ))}
  </div>
);

export default QuestionList;