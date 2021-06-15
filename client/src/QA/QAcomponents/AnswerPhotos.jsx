import React, { useState } from 'react';

const AnswerPhotos = ({ photo }) => {
  const [modal, setModal] = useState(false);

  const handlePhotoClick = (event) => {
    setModal(!modal);
  };

  const answerPhotoModal = (
    <div
      className='answer-photo-modal'
      onClick={handlePhotoClick}>
      <img
        className='enlarged-answer-photo-modal'
        src={photo}
        onClick={event => event.stopPropagation()}
      ></img>
    </div>
  );

  return (
    <div>
      <div className='answer-photo-box'>
        <img
          className='answer-photo'
          src={photo}
          alt='product'
          onClick={handlePhotoClick}
        ></img>
        {modal ? answerPhotoModal : null}
      </div>
    </div>
  );

};
export default AnswerPhotos;