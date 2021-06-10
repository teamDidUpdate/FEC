import React, { useState, useEffect } from 'react';
import axios from 'axios';
import APIToken from '../../../../config.js';
import StarsRating from 'stars-rating';
import RatingEntry from './RatingEntry.jsx';

const ReviewEntry = ({ productId, setReviewCount, setRating }) => {
  const [currentProduct, setCurrentProduct] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [currentlyShowing, setCurrentlyShowing] = useState([]);
  const [sortedReviews, setSortedReviews] = useState([]);


  useEffect(() => {
    for (var i = 1; i < 2; i++) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/?product_id=${productId}&count=50&page=${i}`,
        { headers: { Authorization: APIToken.TOKEN } },
        { params: { productId: productId } })
        .then((response) => {
          setAllReviews(response.data.results);
          setCurrentlyShowing(response.data.results.slice(0, 2));
          setSortedReviews(response.data.results.sort((a, b) => parseFloat(a.review_id) - parseFloat(b.review_id)));
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  }, [productId]);

  // for grab rating
  useEffect(() => {
    setReviewCount(allReviews.length);
  }, [allReviews]);

  return (
    <div className="ReviewsOverview">
      <RatingEntry currentProductId={productId} setRating={setRating}/>
      <div className='reviewEntry'>
        <div className='numberOfReviews'>{allReviews.length} Reviews sorted by Relevance</div>
        {allReviews.length > 0 ?
          currentlyShowing.map((review) =>
            <div className='individualReview' key={review.review_id}>
              <div className='header'>
                <div className='ratingReview' id='alignleft'><StarsRating count={5} value={review.rating} edit={false} color2={'#333300'}/></div>
                <p className='reviewDateAndName' id='alignright'>{review.reviewer_name + ', ' + ' ' + Date(review.date).substring(4, 15)}</p>
                <br></br>
              </div>
              <p className='summary'>{review.summary}</p>
              <br></br>
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
};


export default ReviewEntry;
