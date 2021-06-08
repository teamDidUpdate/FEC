import React, { useState, useEffect } from 'react';
import axios from 'axios';

import sample from './sampleData.js';

import QAsearch from './QAcomponents/QAsearch.jsx';
import QuestionList from './QAcomponents/QuestionList.jsx';
import Helpful from './QAcomponents/QAhelpful.jsx';

const QAwidget = ( {currentProduct, productId, setProductId, getProductById} ) => {
  console.log(currentProduct)
  const [questions, setQuestions] = useState(sample.questions);
  const [searchInput, setSearchInput] = useState('');
  const [product, setProduct] = useState('');

  // Fetch data
  // use axios GET request with promise chain
  // GET: /qa/questions/:product_id
  // const fetchQuestions = () => {
  //   axios.get('/getProduct')
  //     .then((res) => {
  //       res.data.forEach((file) => {
  //         this.setState({
  //           entry: this.state.entry.concat(file)
  //         });
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return;
  //     });
  // };

  return (
    <div>
      <div className='qa-header'>Question Answers</div>
      <QAsearch />
      <QuestionList questions={questions.results}/>
      <Helpful report={'Add Answer'} />

      <Helpful report={'Add Answer'} />

    </div>
  );
};

export default QAwidget;