import React from 'react';
import StarsRating from 'stars-rating';

const Stars = (props) => {
  return (
    <div className='StarsRating'>
      <StarsRating count={5} value={props.calValue} half={true} edit={false} color2={'#333300'} />
    </div>
  );
};

export default Stars;