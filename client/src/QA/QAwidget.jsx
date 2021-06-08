import React, { useState, useEffect } from 'react';
import axios from 'axios';

import sample from './sampleData.js';

import QAsearch from './QAcomponents/QAsearch.jsx';
import QuestionList from './QAcomponents/QuestionList.jsx';
import Helpful from './QAcomponents/QAhelpful.jsx';

const QAwidget = ( {productId, setProductId, getProductById} ) => {
  const [questions, setQuestions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [product, setProduct] = useState('');

  const fetchQuestions = async () => {
    try {
      let response = await fetch(`http://localhost:1128/relatedItems/?productId=${productId}`);
      if (!response.ok) {
        throw 'Error while fetching related items';
      }
      let relatedItemIds = await response.json();
      let items = relatedItemIds.map(relatedItemId => {
        return getProductById(relatedItemId);
      });
      let newItems = await Promise.all(items);
      setRelatedItems(newItems);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className='qa-header'>Question Answers</div>
      <QAsearch />
      <QuestionList answers={this.state.answers} questions={this.state.questions.results}/>
      <Helpful report={'Add Answer'} />

      <Helpful report={'Add Answer'} />

    </div>
  );
}

class QAwidget extends React.Component {
  constructor(props) {
    super(props);
    // State
    this.state = {
      questions: sample.questions, // set this back to :[]
      answers: []
    };
    // Bindings

  }
  // Fetch data
  // use axios GET request with promise chain
  // GET: /qa/questions/:product_id
  fetchQuestions () {
    axios.get('/getQA')
      .then((res) => {
        res.data.forEach((file) => {
          this.setState({
            entry: this.state.entry.concat(file)
          });
        });
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }

  // Render
  render() {
    return (
      <div>
        <div className='qa-header'>Question Answers</div>
        <QAsearch />
        <QuestionList answers={this.state.answers} questions={this.state.questions.results}/>
        <Helpful report={'Add Answer'} />

        <Helpful report={'Add Answer'} />

      </div>
    );
  }
}

export default QAwidget;