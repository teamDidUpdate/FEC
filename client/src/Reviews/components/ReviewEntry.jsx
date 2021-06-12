import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarsRating from 'stars-rating';
import RatingEntry from './RatingEntry.jsx';

const ReviewEntry = ({ productId, setReviewCount, setRating }) => {
  const [currentProduct, setCurrentProduct] = useState([]);
  const [storedReviews, setstoredReviews] = useState([]);
  const [currentlyShowing, setCurrentlyShowing] = useState([]);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [fiveStarReviews, setFiveStarReviews] = useState([]);
  const [fourStarReviews, setFourStarReviews] = useState([]);
  const [threeStarReviews, setThreeStarReviews] = useState([]);
  const [twoStarReviews, setTwoStarReviews] = useState([]);
  const [oneStarReviews, setOneStarReviews] = useState([]);



  useEffect(() => {
    axios.get('/fetchReviews', { params: { productId: productId } })
      .then((response) => {
        var emptyArray = [];
        setCurrentlyShowing(emptyArray.slice());
        setFiveStarReviews(emptyArray.slice());
        setFourStarReviews(emptyArray.slice());
        setThreeStarReviews(emptyArray.slice());
        setTwoStarReviews(emptyArray.slice());
        setOneStarReviews(emptyArray.slice());

        response.data.results.map((element) => {
          if (element.rating === 5) {
            setFiveStarReviews((previousState) => previousState.concat(element));
          }

          if (element.rating === 4) {
            setFourStarReviews((previousState) => previousState.concat(element));
          }

          if (element.rating === 3) {
            setThreeStarReviews((previousState) => previousState.concat(element));
          }

          if (element.rating === 2) {
            setTwoStarReviews((previousState) => previousState.concat(element));
          }

          if (element.rating === 1) {
            setOneStarReviews((previousState) => previousState.concat(element));
          }
        });

        setSortedReviews(response.data.results.slice(0).sort((a, b) => parseFloat(a.review_id) - parseFloat(b.review_id)));
        setCurrentlyShowing(response.data.results.splice(0, 2));
        setstoredReviews(response.data.results.slice(0));
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [productId]);

  useEffect(() => {
    setReviewCount(sortedReviews.length);
  }, [sortedReviews]);


  var handleImageClick = function (event) {
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById('img01');
    modal.style.display = 'block';
    modalImg.src = event.target.src;
  };

  var handleModalClose = (event) => {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName('close')[0];
    modal.style.display = 'none';
  };

  var handleHelpfulnessClick = (event) => {
    var stringId = event.target.id.toString();
    var id = document.getElementsByClassName(stringId)[0];
    if (event.target.className === 'clickedTrue') {
      axios.get('/helpfulReview', { params: { productId: stringId } });
      id.innerText++;
      event.target.className = 'clickedFalse';
    }
  };

  var handleMoreReviews = () => {
    setCurrentlyShowing(previousState => previousState.concat(storedReviews.splice(0, 2)));
  };

  var handleSortClick = (e) => {
    var currentSort = document.getElementById('dropdown');
    currentSort.innerText = '';
    currentSort.append(e.target);
  };

  var handleAddReview = () => {
    var modal = document.getElementById('reviewModal');
    modal.style.display = 'block';
  };

  var handleReviewModalClose = () => {
    var modal = document.getElementById('reviewModal');
    modal.style.display = 'none';
  };

  var handleReviewSubmission = (event) => {
    event.preventDefault();
  };

  var handleTextChange = (event) => {
    console.log(event.target.value);
  };

  var test = () => {
    var innerTest = document.getElementsByClassName('numRatingClickedTrue');
    var emptyArray = [];
    for (var i = 0; i < innerTest.length; i++) {
      var currentRatingSelected = innerTest[i].innerText[0];
      if (currentRatingSelected === '5') {
        setCurrentlyShowing(() => emptyArray.concat(fiveStarReviews));
        setFiveStarReviews([]);
      }

      if (currentRatingSelected === '4') {
        setCurrentlyShowing(() => emptyArray.concat(fourStarReviews));
        setFourStarReviews([]);
      }

      if (currentRatingSelected === '3') {
        setCurrentlyShowing(() => emptyArray.concat(threeStarReviews));
        setThreeStarReviews([]);
      }

      if (currentRatingSelected === '2') {
        setCurrentlyShowing((previousState) => previousState.concat(twoStarReviews));
        setTwoStarReviews([]);
      }

      if (currentRatingSelected === '1') {
        setCurrentlyShowing(() => emptyArray.concat(oneStarReviews));
        setOneStarReviews([]);
      }

    }
  };

  return (

    <div className="ReviewsOverview" id="jumpEntry">

      <RatingEntry currentProductId={productId} setRating={setRating} />
      <div className='reviewEntry'>
        <button onClick={test}>Test</button>
        <div className='numberOfReviews'>{sortedReviews.length} reviews, sorted by {' '}
          <div className="dropdown" id='dropdown'>
            <span> relevance</span>
            <div className="dropdown-content" onClick={handleSortClick}>
              <p>newest</p>
            </div>
          </div></div>
        {currentlyShowing.length > 0 ?
          currentlyShowing.map((review) =>
            <div className='individualReview' key={review.review_id}>
              <div className='reviewHeader'>
                <div className='ratingReview' id='alignleft'><StarsRating count={5} value={review.rating} edit={false} color2={'#333300'} /></div>
                <p className='reviewDateAndName' id='alignright'>{review.reviewer_name + ', ' + ' ' + Date(review.date).substring(4, 15)}</p>
                <br></br>
                <br></br>
              </div>
              <p className='summary'>{review.summary}</p>
              <br></br>

              <br></br>
              <p className='reviewBody'>{review.body}</p>
              {review.recommend === true ?
                <p className='recommendedTrue'>
                  <img src='https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/checkmark-24-512.png' height='10' width='10' className='recommendCheck'></img> I recommend this product</p> :
                null}
              <p className='helpfulness'>Was this review helpful?
                <span className='clickedTrue' onClick={handleHelpfulnessClick} id={review.review_id}>Yes</span>
                (<span className={review.review_id}>{review.helpfulness}</span>)
              </p>

              <div className='reviewPhotos'>{review.photos.length > 0 ?
                review.photos.map((element) => (
                  <div className='Modals' key={element.url}>
                    <img id='myImg' src={element.url} onClick={handleImageClick} width='100px' height='100px'></img>
                    <div id='myModal' className='modal'>
                      <span className='close' onClick={handleModalClose}>&times;</span>
                      <img className='modal-content' id='img01'></img>
                    </div>
                  </div>
                )) :
                null}</div>
            </div>) :
          null}
        <div className='reviewButtons'>
          <button className='moreReviews' onClick={handleMoreReviews}>More Reviews</button>
          <div className='reviewButton'>
            <button className='addReview' id="myBtn" onClick={handleAddReview}>Add a Review</button>
            <div id="reviewModal" className="modal">
              <div className="addReview-modal-content">
                <span className="close" onClick={handleReviewModalClose}>&times;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ReviewEntry;
