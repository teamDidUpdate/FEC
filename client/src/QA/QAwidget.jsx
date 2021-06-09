import React, { useState, useEffect } from 'react';
import axios from 'axios';

import sample from './sampleData.js';

import Search from './QAcomponents/Search.jsx';
import QuestionList from './QAcomponents/QuestionList.jsx';
import Helpful from './QAcomponents/Helpful.jsx';
import AddQuestion from './QAcomponents/AddQuestion.jsx';

const QAwidget = ( { currentProduct } ) => {

  // const [questions, setQuestions] = useState(sample.questions);
  const [searchInput, setSearchInput] = useState('');
  const [product, setProduct] = useState('');

  return (
    <div>
      <div>

        <div>Question Answers</div>
        <Search />
        {currentProduct !== undefined && Object.keys(currentProduct).length !== 0 ?
          <QuestionList
            searchInput={searchInput}
            questions={currentProduct.questionsAnswers.results} />
          : console.log('loading Q&A')}
        {/* <Helpful report={'Add Answer'} /> */}
        <AddQuestion productID={currentProduct.product_id}/>

      </div>
    </div>

  );
};

export default QAwidget;