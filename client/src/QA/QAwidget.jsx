import React, { useState } from 'react';
import axios from 'axios';

import sample from './sampleData.js';

import QAsearch from './QAcomponents/QAsearch.jsx';
import QuestionList from './QAcomponents/QuestionList.jsx';
import Helpful from './QAcomponents/QAhelpful.jsx';

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
    axios.get('/getReview')
      .then((res) => {
        res.data.forEach((element) => {
          this.setState({
            entry: this.state.entry.concat(element)
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