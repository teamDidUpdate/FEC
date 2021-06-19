import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../QAcomponents/Search.jsx';
import QuestionList from '../QAcomponents/QuestionList.jsx';
import AddQuestion from '../QAcomponents/AddQuestion.jsx';
import AnswerHelpful from '../QAcomponents/AnswerHelpful.jsx';
import AnswerPhotos from '../QAcomponents/AnswerPhotos.jsx';
import Answers from '../QAcomponents/Answers.jsx';
import MoreAnswers from '../QAcomponents/MoreAnswers.jsx';
import Question from '../QAcomponents/Question.jsx';
import QuestionHelpful from '../QAcomponents/QuestionHelpful.jsx';
import sample from './sampleData.js';


// npm test -- -t 'render Q&A Search without crashing'
it ('render Q&A Search without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Search />, div);
});

// npm test -- -t 'render Question List without crashing'
it ('render Question List without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuestionList
    questions={sample.questions.results}
    searchInput={null}
    productId={13023}/>, div);
});

// npm test -- -t 'render Add Question Button Modal crashing'
it ('render Add Question Button Modal crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddQuestion />, div);
});

// npm test -- -t 'render Answer Helpfulness without crashing'
it ('render Answer Helpfulness without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AnswerHelpful
    answerId={sample.questions.results[0].answers.id}
    answerHelpfulness={sample.questions.results[0].answers.helpfulness}
    answerDate={'2018-08-18T00:00:00.000Z'}
    answerName={sample.questions.results[0].answers.answerer_name}/>, div);
});

// npm test -- -t 'render Answer Photos without crashing'
it ('render Answer Photos without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AnswerPhotos
    photo={'urlplaceholder/answer_5_photo_number_1.jpg'}
    key={1}/>, div);
});

// npm test -- -t 'render Answer List without crashing'
it ('render Answer List without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Answers
    key={sample.questions.results[0].answers.id}
    answer={
      {
        /* eslint-disable */
        answerer_name: 'notKathy!',
        /* eslint-enable */
        body: 'This is a an answer!',
        date: '2021-06-19T00:00:00.000Z',
        helpfulness: 0,
        id: 1992060,
        photos: [{
          'id': 1,
          'url': 'urlplaceholder/answer_5_photo_number_1.jpg'
        }]
      }
    }/>, div);
});

// npm test -- -t 'render More Answer button without crashing'
it ('render More Answer button without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MoreAnswers
    answerList={[{
      0: {
        /* eslint-disable */
        answerer_name: 'notKathy!',
        /* eslint-enable */
        body: 'This is a an answer!',
        date: '2021-06-19T00:00:00.000Z',
        helpfulness: 0,
        id: 1992060,
        photos: [{
          'id': 1,
          'url': 'urlplaceholder/answer_5_photo_number_1.jpg'
        }]
      }
    }]}
    answer={{
      /* eslint-disable */
      answerer_name: 'notKathy!',
      /* eslint-enable */
      body: 'This is a an answer!',
      date: '2021-06-19T00:00:00.000Z',
      helpfulness: 0,
      id: 1992060,
      photos: [{
        'id': 1,
        'url': 'urlplaceholder/answer_5_photo_number_1.jpg'
      }]
    }}/>, div);
});

// npm test -- -t 'render Individual Questions without crashing'
it ('render Individual Questions without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Question
    question={sample.questions.results[0]}
    key={sample.questions.results[0].question_id}/>, div);
});

// npm test -- -t 'render Question Helpfulness section without crashing'
it ('render Question Helpfulness section without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuestionHelpful
    questionBody={sample.questions.results[0].question_body}
    helpfulness={sample.questions.results[0].question_helpfulness}
    questionId={sample.questions.results[0].question_id}/>, div);
});
