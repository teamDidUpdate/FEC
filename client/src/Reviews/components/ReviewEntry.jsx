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

  var handleImageClick = function () {
    console.log('placeholder');
  };

  var handleHelpfulnessClick = (event) => {
    var stringId = event.target.id.toString();
    if (event.target.className === 'clickedTrue') {
      axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/${stringId}/helpful`, 'placeHolder',
        { headers: { Authorization: APIToken.TOKEN } });
      event.target.innerText++;
      event.target.className = 'clickedFalse';
    }

  };

  return (
    <div className="ReviewsOverview" id="jumpEntry">
      <RatingEntry currentProductId={productId} setRating={setRating} />
      <div className='reviewEntry'>
        <div className='numberOfReviews'>{allReviews.length} Reviews sorted by Relevance</div>
        {allReviews.length > 0 ?
          currentlyShowing.map((review) =>
            <div className='individualReview' key={review.review_id}>
              <div className='reviewHeader'>
                <div className='ratingReview' id='alignleft'><StarsRating count={5} value={review.rating} edit={false} color2={'#333300'} /></div>
                <p className='reviewDateAndName' id='alignright'>{review.reviewer_name + ', ' + ' ' + Date(review.date).substring(4, 15)}</p>
                <br></br>
              </div>
              <p className='summary'>{review.summary}</p>
              <br></br>
              <p className='reviewBody'>{review.body}</p>
              {review.recommend === true ?
                <p className='recommendedTrue'>
                  <img src='https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/checkmark-24-512.png' height='10' width='10' className='recommendCheck'></img> I recommend this product</p> :
                null}
              <p className='helpfulness'>Was this review helpful? Yes (<span className='clickedTrue' id={review.review_id} onClick={handleHelpfulnessClick}>{review.helpfulness}</span>)</p>
              <div>{review.photos.length > 0 ?
                review.photos.map((element) => (
                  <img src={element.url} height='150' width='150' onClick={handleImageClick} key={element.url}></img>
                )) :
                null}</div>
            </div>) :
          null}
        <div className='reviewButtons'>
          <button className='moreReviews'>More Reviews</button>
          <button className='addReviews'>Add a Review</button>
        </div>


      </div>
    </div>
  );
};


export default ReviewEntry;
