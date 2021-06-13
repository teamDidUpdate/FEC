import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AddQuestion = ({ productId }) => {
  // TODO: add functionalities and verificatio for name/email, etc
  const [formData, setFormData] = useState({ productId: productId });
  const [formValidate, setFormValidate] = useState({
    body: [false, null],
    name: [false, null],
    email: [false, null]
  });
  // Event handlers
  var handleFormOpen = (event) => {
    var modal = document.getElementById('myModal');
    var modalForm = document.getElementById('question-form');
    modal.style.display = 'block';
  };
  var handleFormClose = (event) => {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName('close')[0];
    modal.style.display = 'none';
  };

  const regexVerifyEmail = (email) => {
    const characterTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return characterTest.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    regexVerifyEmail(formData.email)
      ? axios.post('/qa/questions', formData)
        .then(() => {

        })
        .catch(err => {
          console.log(err);
        })

      : setFormValidate({
        ...formValidate, email: [true, 'Invalid Email']
      });
  };

  const handleChange = (prop, target, limit) => {
    let newFormData;
    if (target.value.length > limit) {
      target.value = target.value.slice(0, limit);
      newFormData = JSON.parse(JSON.stringify(formValidate));
      newFormData[prop][1] = 'Character Limit Reached';
      setFormValidate(newFormData);

    } else {
      newFormData = JSON.parse(JSON.stringify(formValidate));
      for (const prop of newFormData) {
        newFormData[prop][1] = false;
      }
      if (regexVerifyEmail(formData.email)) {
        newFormData.email[0] = false;
        newFormData.email[1] = null;
      }
      setFormValidate(newFormData);
      newFormData = JSON.parse(JSON.stringify(formData));
      newFormData[prop] = target.value;
      setFormData(newFormData);
    }
  };

  let modalBody = (
    <div style={{
      position: 'absolute',
      width: 400,
      backgroundColor: 'grey',
      border: '2px solid #000',
      boxShadow: '10px, 5px, 5px, red',
      padding: '2, 4, 3',
    }}>
      <div>

        <div>
          <h4>Ask Your Question</h4>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label for='add-question'>Answer*</label>
                <input
                  id='add-question'
                  required
                  onChange={(element) => handleChange('body', element.target, 1000)}
                />
                <span>
                  {formValidate.body[1]}
                </span>
              </div>
              <div>
                <label color='primary' for='add-question-name'>
                  Name*
                </label>
                <span>
                  <p>
                    For privacy reasons, do not use your full name or email
                    address
                  </p>
                </span>
                <input
                  id='add-question-name'
                  required
                  onChange={(e) => handleChange('name', e.target, 60)}
                />
                <span>
                  {formValidate.name[1]}
                </span>
              </div>
              <div>
                <label for='add-question-email'>Email*</label>
                <span>
                  <p>
                    For authentication reasons, you will not be emailed
                  </p>
                </span>
                <input
                  id='add-question-email'
                  required
                  onChange={(e) => handleChange('email', e.target, 60)}
                  error={formValidate.email[0]}
                />
                <span>
                  {formValidate.email[1]}
                </span>
              </div>
              <div>
                <button type='submit'>
                  ADD
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );


  return (
    <div>

      <button onClick={handleFormOpen}>
        ADD A QUESTION +
      </button>

      <div className='Modals' key={photo}>
        <img id='q-form' onClick={handleFormOpen} width='100px' height='100px'></img>
        <div id='myModal' className='modal'>
          <span className='close' onClick={handleFormClose}>&times;</span>
          <img className='modal-content' id='question-form'></img>
          <div id='caption'></div>
        </div>
      </div>

      {/* <Modal
        open={open}
        onClose={handleCloseForm}
        aria-labelledby="add-question-title"
      >
        {modalBody}
      </Modal> */}

    </div>
  );
};

export default AddQuestion;