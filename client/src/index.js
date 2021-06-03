import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };

  }

  fetchStuff(term) {
    // TODO
  }

  render() {
    return (
      <div>
        <h1>Let's Go!</h1>
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));