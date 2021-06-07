import React from 'react';
import axios from 'axios';
import ReviewEntry from './components/ReviewEntry.jsx';

class ReviewsOverview extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <ReviewEntry/>
      </div>
    );
  }
}

export default ReviewsOverview;