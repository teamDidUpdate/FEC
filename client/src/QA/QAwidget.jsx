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
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios.get('/qa/questions', {params: { productId: productId }})
      .then(response => {
        setQuestions(response.data);
      })
      .catch(err => console.log(err));
  }, [productId]);

  const handleSearch = (searchInput) => {
    searchInput.length > 2
      ? setSearchInput(searchInput)
      : setSearchInput('');
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  // Bindings

  return (
    <div>
      <div className='qa-widget'>

        <h1 className='qa-header'>Questions &amp; Answers</h1>
        <Search
          handleSearch={handleSearch}
          searchInput={searchInput} />

        {questions !== undefined && Object.keys(questions).length !== 0 ?
          <QuestionList
            productId={productId}
            searchInput={searchInput}
            questions={questions.results}
          />
          : null}
        <button onClick={handleModalOpen}> ADD A QUESTION + </button>
        <AddQuestion
          productId={productId}
          openModal={openModal}
          handleModalClose={handleModalClose}
        />

      </div>
    </div>
  );
};

export default QAwidget;