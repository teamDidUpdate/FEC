import React from 'react';

const Title = (props) => {
  return (
    <div>
      <div>{props.product.category}</div>
      <h2>{props.product.name}</h2>
    </div>
  );
};

export default Title;