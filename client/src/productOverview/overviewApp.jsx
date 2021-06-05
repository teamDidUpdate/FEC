import React from 'react';
import Rating from './rating.jsx';

class OverviewApp extends React.Component {
  constructor() {
    super();
  }

  render () {
    return (
      <div>
        <div id="header" classname="overview-header">
          <h1>logo</h1>
        </div>
          Rating:
        <Rating />
      </div>
    );
  }
}

export default OverviewApp;