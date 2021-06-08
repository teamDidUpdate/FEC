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
    axios.get('/getReview')
      .then((res) => {
        res.data.forEach((element) => {
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

