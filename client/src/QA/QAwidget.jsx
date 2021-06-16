import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './QAcomponents/Search.jsx';
import QuestionList from './QAcomponents/QuestionList.jsx';
import AddQuestion from './QAcomponents/AddQuestion.jsx';

const QAwidget = ( { productId } ) => {
  const [questions, setQuestions] = useState([]);
  const [searchInput, setSearchInput] = useState(null);
  const [displayQuestions, setDisplayQuestions] = useState(4);
  const [openModal, setOpenModal] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    axios.get('/qa/questions', {params: { productId: productId }})
      .then(response => {
        setQuestions(response.data.results
          .sort((a, b) => a.helpfulness - b.helpfulness));
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

  return (
    <>
      <div className='qa-widget'>
        <h1 className='qa-header'>Questions &amp; Answers</h1>
        <Search
          handleSearch={handleSearch}
          searchInput={searchInput}
        />
        {questions !== undefined && Object.keys(questions).length !== 0 && !rendered ?
          (<QuestionList
            productId={productId}
            searchInput={searchInput}
            questions={questions}
            openModal={openModal}
            handleModalClose={handleModalClose}
            handleModalOpen={handleModalOpen}
          />, setRendered(true))
          : null}
      </div>
    </>
  );
};

export default QAwidget;