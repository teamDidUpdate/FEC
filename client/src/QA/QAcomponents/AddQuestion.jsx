import React, { useState } from 'react';
import axios from 'axios';

const AddQuestion = ({ productId, handleModalClose, openModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [questionBody, setQuestionBody] = useState('');

  const selectModal = (event) => {
    event.stopPropagation();
    handleModalClose();
  };

  const regexVerifyEmail = (email) => {
    const characterTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return characterTest.test(email);
  };

  const dataFill = (event) => {
    event.target.placeholder === 'Example: jack@email.com'
      ? setEmail(event.target.value)
      : event.target.placeholder === 'Examples: jackson11!'
        ? setName(event.target.value)
        : setQuestionBody(event.target.value);
  };

  const handleSubmitQuestion = (event) => {
    event.preventDefault();

    regexVerifyEmail(email)
      ? axios.post('/qa/questions', {
        body: questionBody,
        name: name,
        email: email,
        productId: productId
      })
        .then((response) => {
          console.log('succesful question post', response.data);
          handleModalClose();
        })
        .catch(err => {
          console.log(err);
        })
      : null;
  };
  const QuestionModalForm = (
    <div
      className='question-modals'
      onClick={event => selectModal(event)}
    >
      <div
        className='question-modal-control'
        onClick={event => event.stopPropagation()}
      >
        <span
          className='close-button'
          onClick={event => selectModal(event)}
        >&times;</span>

        <form className='question-modal-form'>
          <p>Email, Name, Question</p>
          <input required
            className='question-email-input'
            onChange={(event) => { dataFill(event); }}
            placeholder="Example: jack@email.com"
            type="email"
            maxLength="60"
            autoComplete="off"
            value={email}
          >
          </input>
          <p>For authentication reasons, you will not be emailed</p>

          <input required
            className='question-name-input'
            onChange={(event) => { dataFill(event); }}
            placeholder="Examples: jackson11!"
            type="text"
            maxLength="60"
            autoComplete="off"
            value={name}
          >
          </input>
          <p>For privacy reasons, do not use your full name or email address</p>

          <textarea required
            className='question-ask'
            onChange={(event) => { dataFill(event); }}
            placeholder="Enter Question Here..."
            type="text"
            maxLength="1000"
            minLength=""
            autoComplete="off"
            value={questionBody}
          >
          </textarea>

          <button
            className='submit-new-question'
            onClick={(event) => { handleSubmitQuestion(event); }}
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      {openModal ? QuestionModalForm : null}
    </div>

  );
};

export default AddQuestion;