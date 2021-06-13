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
  const [searchInput, setSearchInput] = useState(null);
  const [product, setProduct] = useState('');

  useEffect(() => {
    axios.get('/qa/questions', {params: { productId: productId }})
      .then(response => {
        setQuestions(response.data);
      })
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

        <h3 className='qa-header'>Question And Answers</h3>
        <Search
          handleSearch={handleSearch}
          searchInput={searchInput} />

        {questions !== undefined && Object.keys(questions).length !== 0 ?
          <QuestionList
            productId={productId}
            searchInput={searchInput}
            questions={questions.results} />
          : null}

        <AddQuestion
          productId={questions.productId}
        />

      </div>
    </div>
  );
};

export default QAwidget;