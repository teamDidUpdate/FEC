import React from 'react';

const Helpful = (props) => {
  let input = '';
  if (props.report === 'report') {
    input = 'Report';
  }
  return (
    <div>
      Helpful?
      <span>Yes</span>
      <span>(0) | </span>
      <span clasName='helpful-input'>{input}</span>
    </div>
  );
};

export default Helpful;