import React, { useState } from 'react';

const Photos = ({ photo }) => (
  <img src={photo} className='photo' width={75} height={75}></img>
);

export default Photos;