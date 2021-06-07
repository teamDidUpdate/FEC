import React, { useState } from 'react';
import axios from 'axios';
// import '../../dist/styles.css';

import QAsearch from './QAcomponents/QAsearch.jsx';
import QuestionList from './QAcomponents/QuestionList.jsx';
import sample from './sampleData.js';

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

  // Render
  render() {
    return (
      <div>
        <div className='qa-header'>Question Answers</div>
        <QAsearch />
        <QuestionList answers={this.state.answers} questions={this.state.questions.results}/>
      </div>
    );
  }
}

export default QAwidget;