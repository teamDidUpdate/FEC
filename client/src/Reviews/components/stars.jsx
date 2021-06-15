import React, { useContext } from 'react';
import { ThemeContext } from '../../App.jsx';
import StarsRating from 'stars-rating';

const Stars = (props) => {
  const darkTheme = useContext(ThemeContext);
  return (
    <div className='StarsRating'>
      <StarsRating count={5} value={props.calValue} half={true} edit={false} />
    </div>
  );
};

export default Stars;