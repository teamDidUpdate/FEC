import React from 'react';
import Question from './Question.jsx';
import MoreQuestions from './MoreQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';

const QuestionList = ({ questions, searchInput, productId, openModal, handleModalOpen, handleModalClose }) => (
  <div className='question-list'>
    {
      searchInput === null
        ?
        questions
          .slice(0, 5)
          .map((question, count) => (
            count > 3
              ? <MoreQuestions
                questions={questions}
                key={question.question_id}
              />
              : <Question
                question={question}
                productId={productId}
                key={question.question_id} />
          ))
        :
        questions.filter(q => {
          if (q.question_body.toLowerCase()
            .includes(searchInput.toLowerCase())) {
            return q;
          }
        })
          .slice(0, 5)
          .map((question, count) => (
            count > 3
              ? <MoreQuestions
                questions={questions}
                key={question.question_id}
              />
              : <Question
                question={question}
                productId={productId}
                key={question.question_id}
              />
          ))
    }
  </div>
);

export default QuestionList;