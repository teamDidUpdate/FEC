import React from 'react';

const Title = (props) => {
  return (
    <div>
      <div className="category">{props.product.category}</div>
      <h2 className="product-name">{props.product.name}</h2>
    </div>
  );
};

export default Title;