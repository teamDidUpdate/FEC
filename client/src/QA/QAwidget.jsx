import React, { useState, useEffect } from 'react';
import axios from 'axios';

import sample from './sampleData.js';

import Search from './QAcomponents/Search.jsx';
import QuestionList from './QAcomponents/QuestionList.jsx';
import Helpful from './QAcomponents/Helpful.jsx';

const QAwidget = ( {currentProduct, productId, setProductId, getProductById} ) => {

  // const [questions, setQuestions] = useState(sample.questions);
  const [searchInput, setSearchInput] = useState('');
  const [product, setProduct] = useState('');

  return (
    <div>

      <div>Question Answers</div>
      <Search />
      {currentProduct !== undefined && Object.keys(currentProduct).length !== 0 ?
        <QuestionList
          searchInput={searchInput}
          questions={currentProduct.questionsAnswers.results} />
        : console.log('loading Q&A')}

      {/* <QuestionList questions={questions.results}/> */}
      <Helpful report={'Add Answer'} />

      <Helpful report={'Add Answer'} />

    </div>
  );
};

export default QAwidget;