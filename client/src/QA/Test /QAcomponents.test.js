import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../QAcomponents//Search.jsx';
import QuestionList from '../QAcomponents/QuestionList.jsx';
import AddQuestion from '../QAcomponents/AddQuestion.jsx';
import AnswerHelpful from '../QAcomponents/AnswerHelpful.jsx';
import AnswerPhotos from '../QAcomponents/AnswerPhotos.jsx';
import Answers from '../QAcomponents/Answers.jsx';
import MoreAnswers from '../QAcomponents/MoreAnswers.jsx';
import Question from '../QAcomponents/Question.jsx';
import QuestionHelpful from '../QAcomponents/QuestionHelpful.jsx';

it ('render Q&A without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Search />, div);
});

it ('render Question List without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuestionList />, div);
});

it ('render Add Question Button Modal crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddQuestion />, div);
});

it ('render Helpfulness Answer without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AnswerHelpful />, div);
});