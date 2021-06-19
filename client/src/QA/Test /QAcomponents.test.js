import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import Search from '../QAcomponents/Search.jsx';
import QuestionList from '../QAcomponents/QuestionList.jsx';
import AddQuestion from '../QAcomponents/AddQuestion.jsx';
import AnswerHelpful from '../QAcomponents/AnswerHelpful.jsx';
import AnswerPhotos from '../QAcomponents/AnswerPhotos.jsx';
import Answers from '../QAcomponents/Answers.jsx';
import MoreAnswers from '../QAcomponents/MoreAnswers.jsx';
import Question from '../QAcomponents/Question.jsx';
import QuestionHelpful from '../QAcomponents/QuestionHelpful.jsx';
import MoreQuestions from '../QAcomponents/MoreQuestions.jsx';
import sample from './sampleData.js';

afterEach(() => {
  cleanup();
});

// npm test -- -t 'render Q&A Search without crashing'
test ('render Q&A Search without crashing', () => {
  render(<Search
    searchInput={'tuna'}/>);
  const searchElement = screen.getByTestId('search-test');
  expect(searchElement).toBeInTheDocument();
});

// npm test -- -t 'render Question List without crashing'
test ('render Question List without crashing', () => {
  render(<QuestionList
    questions={sample.questions.results}
    searchInput={null}
    productId={13023}/>);
  const questionListElement = screen.getByTestId('qa-list-test');
  expect(questionListElement).toBeInTheDocument();
});

// npm test -- -t 'render Add Question Button Modal crashing'
test ('render Add Question Button Modal crashing', () => {
  render(<AddQuestion
    openModal={true}/>);
  const addQuestionElement = screen.getByTestId('add-question-test');
  expect(addQuestionElement).toBeInTheDocument();
});

// npm test -- -t 'render Answer Helpfulness without crashing'
test ('render Answer Helpfulness without crashing', () => {
  render(<AnswerHelpful
    answerId={sample.questions.results[0].answers.id}
    answerHelpfulness={sample.questions.results[0].answers.helpfulness}
    answerDate={'2018-08-18T00:00:00.000Z'}
    answerName={sample.questions.results[0].answers.answerer_name}/>);
  const answerHelpfulElement = screen.getByTestId('answer-helpful-test');
  expect(answerHelpfulElement).toBeInTheDocument();
});

// npm test -- -t 'render Answer Photos without crashing'
test ('render Answer Photos without crashing', () => {
  render(<AnswerPhotos
    photo={'urlplaceholder/answer_5_photo_number_1.jpg'}
    key={1}/>);
  const answerPhotosElement = screen.getByTestId('answer-photo-test');
  expect(answerPhotosElement).toBeInTheDocument();
});

// npm test -- -t 'render Answer List without crashing'
test ('render Answer List without crashing', () => {
  render(<Answers
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
    }/>);
  const answerListElement = screen.getByTestId('answer-list-test');
  expect(answerListElement).toBeInTheDocument();
});

// npm test -- -t 'render More Answer button without crashing'
test ('render More Answer button without crashing', () => {
  render(<MoreAnswers
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
    }}/>);
  const moreAnswersElement = screen.getByTestId('more-answer-test');
  expect(moreAnswersElement).toBeInTheDocument();
});

// npm test -- -t 'render Individual Questions without crashing'
test ('render Individual Questions without crashing', () => {
  render(<Question
    question={sample.questions.results[0]}
    key={sample.questions.results[0].question_id}/>);
  const individualQuestionElement = screen.getByTestId('individual-question-test');
  expect(individualQuestionElement).toBeInTheDocument();
});

// npm test -- -t 'render Question Helpfulness section without crashing'
test ('render Question Helpfulness section without crashing', () => {
  render(<QuestionHelpful
    questionBody={sample.questions.results[0].question_body}
    helpfulness={sample.questions.results[0].question_helpfulness}
    questionId={sample.questions.results[0].question_id}/>);
  const questionHelpfulElement = screen.getByTestId('question-helpful-test');
  expect(questionHelpfulElement).toBeInTheDocument();
});

// npm test -- -t 'render More Questions without crashing'
test ('render More Questions without crashing', () => {
  render(<MoreQuestions
    questions={sample.questions.results}/>);
  const moreQuestionsElement = screen.getByTestId('more-questions-test');
  expect(moreQuestionsElement).toBeInTheDocument();
});