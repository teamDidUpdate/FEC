import React, { useState } from 'react';

const Photos = ({ photo }) => {

  var handleImageClick = function (event) {
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById('img01');
    modal.style.display = 'block';
    modalImg.src = event.target.src;
  };
  var handleModalClose = (event) => {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName('close')[0];
    modal.style.display = 'none';
  };

  return (

    <div className='answer-photo'
      style={{
        marginRight: '1.5%',
        display: 'inline-flex',
        flexDirection: 'row'
      }}>

      <div className='Modals' key={photo}>
        <img id='myImg' src={photo} onClick={handleImageClick} width='100px' height='100px'></img>
        <div id='myModal' className='modal'>
          <span className='close' onClick={handleModalClose}>&times;</span>
          <img className='modal-content' id='img01'></img>
          <div id='caption'></div>
        </div>
      </div>

    </div>
  );
};

export default Photos;