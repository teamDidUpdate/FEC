import React from 'react';
import axios from 'axios';

class ReviewEntry extends React.Component {
  constructor() {
    super();

    this.state = {
      entry: []
    };
  }

  componentDidMount() {
    axios.get('/https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/?product_id=13023', {
      headers: {
        Authorization: 'KEYGOESHERE'
      }
    })
      .then((res) => {
        res.data.results.forEach((element) => {
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


  render() {
    return (
      <div>
        {this.state.entry.map((element) => (
          <div className='individualReview'>
            <p className='rating'>Rating: {element.rating} THIS WILL BE REPLACED WITH STARS LATER</p>
            <p className='reviewerName'>{element.reviewer_name + ' ' + new Date(element.date)}</p>
            <p className='summary'>{element.summary}</p>
            <p className='body'>{element.body}</p>
            <p className='helpfulness'>Helpful? {element.helpfulness} | Report</p>
            {element.photos.length > 0 ?
              <img src = {element.photos[0].url} className='reviewImages'></img> :
              <img src=''></img>
            }
          </div>
        ))}
      </div>
    );
  }
}

export default ReviewEntry;

