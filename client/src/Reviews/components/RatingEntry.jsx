import React from 'react';
import axios from 'axios';
import APIToken from '../../../../config.js';
class RatingEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allReviews: [],
      currentlyShowing: []
    };
  }

  componentDidMount() {
    for (var i = 1; i < 10; i++) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/?product_id=${this.props.productId}&count=5&page=${i}`, {
        headers: {
          Authorization: APIToken.TOKEN
        }
      })
        .then((res) => {
          this.setState({
            allReviews: this.state.allReviews.concat(res.data.results),
            currentlyShowing: this.state.allReviews.slice(0, 2)
          });
        });
    }
  }

  render() {
    return (
      <div>
        <div className='numberOfReviews'>{this.state.allReviews.length} Reviews</div>
        {this.state.allReviews.length > 2 ?
          this.state.currentlyShowing.map((review) =>
            <div className='individualReview' key={review.review_id}>
              <div className='header'>
                <p className='rating' id='alignleft'>Rating: {review.rating}</p>
                <p className='reviewDateAndName' id='alignright'>{review.reviewer_name + ', ' + ' ' + Date(review.date).substring(4, 15)}</p>
                <br></br>
              </div>
              <br></br>
              <p className='summary'>{review.summary}</p>
              <br></br>
              <p className='body'>{review.body}</p>
              <br></br>
              <p className='helpfulness'>Helpful? Yes ({review.helpfulness}) | Report</p>
              <br></br>
              {review.photos.length > 0 ?
                <div className='reviewImages'>
                  <img src={review.photos[0].url} height="100" width="100"></img>
                </div> :
                <img src=''></img>
              }
            </div>) :
          null
        }
        <br></br>
        {this.state.allReviews.length > 2 ?
          <button>More Reviews</button> :
          null}
        <button>Add Review</button>
      </div>
    );
  }
}


export default RatingEntry;
