import React from 'react';
import ReactDOM from 'react-dom';
import OverviewApp from './productOverview/overviewApp.jsx';
import QAwidget from './QA/QAwidget.jsx';


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
        <QAwidget />
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));