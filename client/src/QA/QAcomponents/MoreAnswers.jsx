import React, { useState, useEffect } from 'react';
import Answers from './Answers.jsx';

const MoreAnswers = ({ answers }) => (
  <div>
    <button style={{
      marginLeft: '10px',
      border: 'none',
      background: 'none',
      cursor: 'pointer'}}>
        MORE ANSWERED QUESTIONS
    </button>
  </div>
);

export default MoreAnswers;