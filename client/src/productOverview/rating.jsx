import React from 'react';

export default class Rating extends React.Component {
  constructor(props) {
    super(props);

  }

  getRate() {

  }

  render() {
    return (
      <div className="rating">
        ★★★★★
        Read all [#] reviews
      </div>

    );
  }
}