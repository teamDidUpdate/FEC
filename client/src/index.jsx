import React from 'react';
import ReactDOM from 'react-dom';
import OverviewApp from './productOverview/overviewApp.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '13023'
    };

  }

  fetchStuff(term) {
    // EXTRA COMMENTS HELLLLOOOO FFFFFOOOOO :o WASSUP.
  }

  render() {
    return (
      <div>
        <OverviewApp id={this.state.productId}/>
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));