import React from 'react';
import Question from './Question.jsx';
import MoreQuestions from './MoreQuestions.jsx';

const QuestionList = ({ questions, searchInput, SearchedQuestions }) => (
  <div className='question-list'>
    {
      searchInput === null
        ?
        questions
          .slice(0, 5)
          .map((question, count) => (
            count > 3
              ? <MoreQuestions questions={questions} key={questions.question_id} />
              : <Question question={question} key={question.question_id} />
          ))
        :
        SearchedQuestions(questions, searchInput)
          .slice(0, 5)
          .map((question, count) => (
            count > 3
              ? <MoreQuestions questions={questions} key={questions.question_id} />
              : <Question question={question} key={question.question_id} />
          ))
    }
  </div>
  // <div className='question-list'>
  //   {questions.map(question => (
  //     <Question question={question} key={question.question_id}/>
  //   ))}
  // </div>
);

export default QuestionList;