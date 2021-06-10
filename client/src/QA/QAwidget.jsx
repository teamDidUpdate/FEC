// Main functinalities imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// JSX imports
import Search from './QAcomponents/Search.jsx';
import QuestionList from './QAcomponents/QuestionList.jsx';
import Helpful from './QAcomponents/Helpful.jsx';
import AddQuestion from './QAcomponents/AddQuestion.jsx';

const QAwidget = ( { productId } ) => {
  const [questions, setQuestions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [product, setProduct] = useState('');

  useEffect(() => {
    axios.get('/qa/questions', {params: { productId: productId }})
      .then(response => setQuestions(response.data))
      .catch(err => console.log(err));
  }, [productId]);

  let handleSearch = (searchInput) => {
    searchInput.length > 2
      ? setSearchInput(searchInput)
      : setSearchInput('');
  };

  // Bindings
  handleSearch = handleSearch.bind(this);


  return (
    <div>
      <div className='qa-widget'>

        <div className='qa-header'>Question And Answers</div>
        <Search
          handleSearch={handleSearch} />

        {questions !== undefined && Object.keys(questions).length !== 0 ?
          <QuestionList
            searchInput={searchInput}
            questions={questions.results} />
          : console.log('loading Q&A')}

        <AddQuestion productID={questions.product_id}/>

      </div>
    </div>
  );
};

export default QAwidget;