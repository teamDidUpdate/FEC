import React, { useState } from 'react';

const Photos = ({ photo }) => {
  const [clicked, setClicked] = useState(false);

  const imgClick = () => setClicked(!clicked);

  const smallPic = (
    <div>
      <img
        src={photo}
        onClick={() => imgClick()}
        style={{
          maxWidth: '100%',
        }}
      ></img>
    </div>
  );

  return (
    <div style={{
      marginRight: '1.5%',
      display: 'inline-flex',
      flexDirection: 'row'
    }}>
      <img
        className='photo'
        src={photo}
        width={75}
        height={75}></img>
    </div>
  );
};

export default Photos;

{/* <img src={photo} className='photo' width={75} height={75}></img> */}