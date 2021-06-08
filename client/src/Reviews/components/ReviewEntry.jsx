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
    axios.post('/getReview', { productID: '13023' })
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
            <p className='rating'>Rating: {element.rating}</p>
            <p className='reviewerName'>{element.reviewer_name}</p>
            <p className='reviewData'>{Date(element.date).substring(0,15)}</p>
            <p className='summary'>{element.summary}</p>
            <p className='body'>{element.body}</p>
            <p className='helpfulness'>Helpful? {element.helpfulness} | Report</p>
            {element.photos.length > 0 ?
              <div className='reviewImages'>
                <img src={element.photos[0].url} height="100" width="100"></img>
              </div> :
              <img src=''></img>
            }
          </div>
        ))}
      </div>
    );
  }
}

export default ReviewEntry;
