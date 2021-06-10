import React from 'react';
import axios from 'axios';
import APIToken from '../../../../config.js';
import RatingEntry from './RatingEntry.jsx';
class ReviewEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allReviews: [],
      currentlyShowing: []
    };
  }

  componentDidMount() {
    for (var i = 1; i < 3; i++) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/?product_id=${this.props.productId}&count=15&page=${i}`, {
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

  componentDidUpdate() {
    this.props.setReviewCount(this.state.allReviews.length);
  }


  render() {
    return (
      <div className="ReviewsOverview">
        <div><RatingEntry productId={this.props.productId}
          setProductId={this.props.setProductId}
          getProductById={this.props.getProductById} /></div>
        <div className='reviewEntry'>
          <div className='numberOfReviews'>{this.state.allReviews.length} Reviews</div>
          {this.state.allReviews.length > 2 ?
            this.state.currentlyShowing.map((review) =>
              <div className='individualReview' key={review.review_id}>
                <div className='header'>
                  <p className='rating' id='alignleft'>Rating: {review.rating}</p>
                  <p className='reviewDateAndName' id='alignright'>{review.reviewer_name + ', ' + ' ' + Date(review.date).substring(4, 15)}</p>
                  <br></br>
                </div>
                <p className='summary'>{review.summary}</p>

                <p className='body'>{review.body}</p>

                <p className='helpfulness'>Helpful? Yes ({review.helpfulness}) | Report</p>

                {review.photos.length > 0 ?
                  <div className='reviewImages'>
                    <img src={review.photos[0].url} height="100" width="100"></img>

                  </div> :
                  <img src=''></img>
                }
              </div>) :
            null
          }
        </div>
      </div>
    );
  }
}


export default ReviewEntry;
