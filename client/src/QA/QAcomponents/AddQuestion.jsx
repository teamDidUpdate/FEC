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
        product_id: productId
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

          <p className='modal-question-title'>
            {document.getElementsByClassName('product-name')[0].innerText}
          </p>

          <label className='modal-label' htmlFor='name'>Email:</label>
          <input required
            className='question-email-input'
            onChange={(event) => { dataFill(event); }}
            placeholder="Example: jack@email.com"
            type="email"
            name='email'
            maxLength="60"
            autoComplete="off"
            value={email}
          ></input>

          <p className='answer-modal-text'>
            For authentication reasons, you will not be emailed
          </p>

          <label className='modal-label' htmlFor='name'>Nickname:</label>
          <input required
            className='question-name-input'
            onChange={(event) => { dataFill(event); }}
            placeholder="Examples: jackson11!"
            type="text"
            name='name'
            maxLength="60"
            autoComplete="off"
            value={name}
          ></input>

          <p className='answer-modal-text'>
            For privacy reasons, do not use your full name or email address
          </p>

          <label className='modal-label' htmlFor='question'>Question:</label>
          <textarea required
            className='question-ask'
            onChange={(event) => { dataFill(event); }}
            placeholder="Enter Question Here..."
            type="text"
            name="question"
            maxLength="1000"
            minLength=""
            autoComplete="off"
            value={questionBody}
          ></textarea>

          <button
            className='submit-new-question'
            onClick={(event) => handleSubmitQuestion(event)}
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {openModal ? QuestionModalForm : null}
    </>

  );
};

export default AddQuestion;