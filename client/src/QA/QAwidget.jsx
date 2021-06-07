import React, { useState } from 'react';
import axios from 'axios';
// import './QAstyles.scss';

import QAsearch from './QAcomponents/QAsearch.jsx';

class QAwidget extends React.Component {
  constructor(props) {
    super(props);
    // State
    this.state = {
      questions: [],
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
      </div>
    );
  }
}

export default QAwidget;