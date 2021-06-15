import React, { useState } from 'react';
import axios from 'axios';

const QuestionHelpful = ({ questionBody, helpfulness, questionId, productId }) => {
  const [helpfulToggle, setHelpfulToggle] = useState(false);
  const [addAnswerModal, setAddAnswerModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [answerBody, setAnswerBody] = useState('');
  const [images, setImages] = useState([]);

  const handleCloseModal = (event => {
    event.stopPropagation();
    setAddAnswerModal(false);
  });

  const regexVerifyEmail = (email) => {
    const characterTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return characterTest.test(email);
  };

  const toggleHelpfulQuestion = () => {
    helpfulToggle
      ? console.log('already toggled')
      : axios.put('/question/helpful', { questionId: questionId })
        .then(() => console.log('+1'))
        .catch(err => console.log(`Err at Marked helpful in Q&A widget ${questionId} ${err}`));
    setHelpfulToggle(true);
  };

  const dataFill = (event) => {
    event.target.placeholder === 'Example: jack@email.com'
      ? setEmail(event.target.value)
      : event.target.placeholder === 'Example: jack543!'
        ? setName(event.target.value)
        : setAnswerBody(event.target.value);
  };

  const addAnswerImg = (event) => {
    const photos = [];
    photos.push(URL.createObjectURL(event.target.files[0]));
    setImages(photos);
  };

  const handleAddAnswer = (event) => {
    event.preventDefault();
    regexVerifyEmail(email)
      ? axios.post('/qa/questions/answer', {
        body: answerBody,
        name: name,
        email: email,
        photos: images,
        questionId: questionId
      })
        .then((response) => {
          console.log('succesful answer post', response.data);
          setAddAnswerModal(false);
        })
        .catch(err => {
          console.log(err);
        })
      : null;
  };

  const addAnswerModalBody = (
    <div className='answer-modal' onClick={event => handleCloseModal(event)}>
      <div className='answer-modal-control' onClick={event => event.stopPropagation()}>
        <span className='answer-modal-close-x'
          onClick={event => handleCloseModal(event)}>&times;</span>
        <p>Q:{questionBody}</p>
        <form className='answer-modal-form'>
          <input className='answer-modal-email' required
            placeholder='Example: jack@email.com'
            value={email}
            type='email'
            maxLength='60'
            autoComplete='off'
            onChange={event => { event.preventDefault(); dataFill(event); }}></input>
          <p>For authentication reasons, you will not be emailed</p>

          <input className='answer-modal-name' required
            placeholder='Example: jack543!'
            type='text'
            maxLength='75'
            autoComplete='off'
            value={name}
            onChange={event => { event.preventDefault(); dataFill(event); }}></input>
          <p>For privacy reasons, do not use your full name or email address</p>

          <textarea className='answer-modal-body' required
            placeholder='Enter Answer Here...'
            type='text'
            maxLength='1000'
            minLength='1'
            autoComplete='off'
            value={answerBody}
            onChange={event => { event.preventDefault(); dataFill(event); }}></textarea>

          <input className='answer-modal-img'
            type='file'
            onChange={addAnswerImg}></input>

          <button className='submit-answer-form-button'
            onClick={event => handleAddAnswer(event)}>
            Submit Answer
          </button>
        </form>

      </div>

    </div>
  );

  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'row',
      fontSize: 15
    }}>
      Helpful?&nbsp;
      <p
        className='helpful-button'
        disabled={helpfulToggle}
        onClick={() => toggleHelpfulQuestion()}
        style={{
          textDecoration: 'underline',
          cursor: 'pointer'
        }}>
        Yes
      </p>
      &nbsp;({helpfulToggle ? helpfulness + 1 : helpfulness}) |

      <div
        className='add-answer'
        onClick={() => setAddAnswerModal(true)}
        style={{
          textDecoration: 'underline',
          cursor: 'pointer'
        }}
      >&nbsp;Add Answer</div>
      <div>{addAnswerModal ? addAnswerModalBody : null}</div>
    </div>
  );
};

export default QuestionHelpful;