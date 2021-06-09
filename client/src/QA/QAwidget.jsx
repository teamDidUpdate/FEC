import React, { useState, useEffect } from 'react';
import axios from 'axios';

import sample from './sampleData.js';

import QAsearch from './QAcomponents/QAsearch.jsx';
import QuestionList from './QAcomponents/QuestionList.jsx';
import Helpful from './QAcomponents/QAhelpful.jsx';

const QAwidget = ( {currentProduct, productId, setProductId, getProductById} ) => {

  // const [questions, setQuestions] = useState(sample.questions);
  const [searchInput, setSearchInput] = useState('');
  const [product, setProduct] = useState('');

  return (
    <div className='qa-widget'>

      <div>Question Answers</div>
      <QAsearch />
      {currentProduct !== undefined && Object.keys(currentProduct).length !== 0 ?
        <QuestionList questions={currentProduct.questionsAnswers.results} />
        : console.log('loading Q&A')}

      {/* <QuestionList questions={questions.results}/> */}
      <Helpful report={'Add Answer'} />

      <Helpful report={'Add Answer'} />

    </div>
  );
};

export default QAwidget;