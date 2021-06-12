import React, { useState } from 'react';

const Photos = ({ photo }) => {
  const [clicked, setClicked] = useState(false);
  const imgClick = () => setClicked(!clicked);

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

  // const smallPic = (
  //   <div>
  //     <img
  //       src={photo}
  //       onClick={() => imgClick()}
  //       style={{
  //         maxWidth: '100%',
  //       }}
  //     ></img>
  //   </div>
  // );

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
    // <div style={{
    //   marginRight: '1.5%',
    //   display: 'inline-flex',
    //   flexDirection: 'row'
    // }}>
    //   <img
    //     className='photo'
    //     src={photo}
    //     width={75}
    //     height={75}></img>
    // </div>
  );
};

export default Photos;

{/* <img src={photo} className='photo' width={75} height={75}></img> */}