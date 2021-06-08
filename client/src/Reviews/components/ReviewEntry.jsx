import React from 'react';
import axios from 'axios';
class ReviewEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: []
    };
  }

  render() {
    return (
      <div>
        <div>{this.props.currentProduct !== undefined && Object.keys(this.props.currentProduct).length !== 0 ?
          <div>{this.props.currentProduct.reviews.results.map((element) =>
            <div className='individualReview' key={element.review_id}>
              <p className='rating'>Rating: {element.rating}</p>
              <p className='reviewerName'>{element.reviewer_name}</p>
              <p className='reviewData'>{Date(element.date).substring(4, 15)}</p>
              <p className='summary'>{element.summary}</p>
              <p className='body'>{element.body}</p>
              <p className='helpfulness'>Helpful? {element.helpfulness} | Report</p>
              {element.photos.length > 0 ?
                <div className='reviewImages'>
                  <img src={element.photos[0].url} height="100" width="100"></img>
                </div> :
                <img src=''></img>
              }
            </div>)}
          </div> :
          console.log()
        }</div>
      </div>
    );
  }
}

export default ReviewEntry;
