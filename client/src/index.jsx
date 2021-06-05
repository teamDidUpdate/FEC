import React from 'react';
import ReactDOM from 'react-dom';
import OverviewApp from './productOverview/overviewApp.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };

  }

  fetchStuff(term) {
    // EXTRA COMMENTS HELLLLOOOO FFFFFOOOOO :o WASSUP.
  }

  render() {
    return (
      <div>
        <OverviewApp />
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));