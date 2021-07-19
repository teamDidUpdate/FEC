import React, { useState } from 'react';
import axios from 'axios';

const AddQuestion = ({ productId, handleModalClose, openModal, prodName }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [questionBody, setQuestionBody] = useState('');

  const selectModal = (event) => {
    event.stopPropagation();
    handleModalClose();
  };

  const regexVerifyEmail = (email) => {
    const characterTest = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

    regexVerifyEmail(email) && name.length && questionBody.length
      ? axios.post('/qa/questions', {
        body: questionBody,
        name: name,
        email: email,
        /* eslint-disable */
        product_id: productId
        /* eslint-enable */
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
    <div data-testid='add-question-test'
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
            Ask a Question
          </p>

          <label className='modal-label' htmlFor='name'>Email:</label>
          <input
            className='question-email-input'
            onChange={(event) => { dataFill(event); }}
            placeholder='Example: jack@email.com'
            type='email'
            name='email'
            maxLength='60'
            autoComplete='off'
            value={email}
            required
          ></input>

          <p className='answer-modal-text'>
            For authentication reasons, you will not be emailed
          </p>

          <label className='modal-label' htmlFor='name'>Nickname:</label>
          <input
            className='question-name-input'
            onChange={(event) => { dataFill(event); }}
            placeholder='Examples: jackson11!'
            type='text'
            name='name'
            maxLength='60'
            autoComplete='off'
            value={name}
            required
          ></input>

          <p className='answer-modal-text'>
            For privacy reasons, do not use your full name or email address
          </p>

          <label className='modal-label' htmlFor='question'>Question:</label>
          <textarea
            className='question-ask'
            onChange={(event) => { dataFill(event); }}
            placeholder='Enter Question Here...'
            type='text'
            name='question'
            maxLength='1000'
            minLength=''
            autoComplete='off'
            value={questionBody}
            required
          ></textarea>

          <input
            type='submit'
            value='Submit Question'
            className='submit-new-question'
            onClick={(event) => handleSubmitQuestion(event)}
          ></input>
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