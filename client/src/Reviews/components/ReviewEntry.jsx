import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../../App.jsx';
import StarsRating from 'stars-rating';
import RatingEntry from './RatingEntry.jsx';

const ReviewEntry = ({ productId, setReviewCount, setRating }) => {
  const [currentProduct, setCurrentProduct] = useState([]);
  const [masterListOfReviews, setMasterListOfReviews] = useState([]);
  const [storedReviews, setStoredReviews] = useState([]);
  const [currentlyShowing, setCurrentlyShowing] = useState([]);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [fiveStarReviews, setFiveStarReviews] = useState([]);
  const [fourStarReviews, setFourStarReviews] = useState([]);
  const [threeStarReviews, setThreeStarReviews] = useState([]);
  const [twoStarReviews, setTwoStarReviews] = useState([]);
  const [oneStarReviews, setOneStarReviews] = useState([]);
  const [emptyArray, setEmptyArray] = useState([]);
  const [currentFilterArray, setCurrentFilterArray] = useState([]);
  const [helpfulReviews, setHelpfulReviews] = useState([]);
  const darkTheme = useContext(ThemeContext);

  useEffect(() => {
    axios.get('/fetchReviews', { params: { productId: productId } })
      .then((response) => {
        resetArrays();
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
        setSortedReviews(response.data.results.slice(0).sort((a, b) => { return b.review_id - a.review_id; }));
        setStoredReviews(response.data.results.slice(0));
        setHelpfulReviews(response.data.results.slice(0).sort((a, b) => { return b.helpfulness - a.helpfulness; }));
        setMasterListOfReviews(response.data.results.slice(0));
        setCurrentlyShowing(response.data.results.slice(0, 2));
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [productId]);

  useEffect(() => {
    setReviewCount(sortedReviews.length);
  }, [sortedReviews]);

  var resetArrays = () => {
    setCurrentlyShowing(emptyArray.slice());
    setFiveStarReviews(emptyArray.slice());
    setFourStarReviews(emptyArray.slice());
    setThreeStarReviews(emptyArray.slice());
    setTwoStarReviews(emptyArray.slice());
    setOneStarReviews(emptyArray.slice());
  };

  var handleImageClick = function (event) {
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById('img01');
    if (modal.style.display === 'block') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'block';
    }
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
    var checkCurrentSort = document.getElementById('currentDrop').innerText;
    if (checkCurrentSort === 'newest') {
      addReviewsWithFilters(sortedReviews);
    } else if (checkCurrentSort === 'relevance') {
      addReviewsWithFilters(storedReviews);
    } else if (checkCurrentSort === 'helpful') {
      addReviewsWithFilters(helpfulReviews);
    }
  };

  var addReviewsWithFilters = (currentDropDownArray) => {
    var count = 0;
    var currentlyShowingJSON = '';
    var currentIterationArray = '';
    for (var i = 0; i < currentDropDownArray.length; i++) {
      currentlyShowingJSON = JSON.stringify(currentlyShowing);
      currentIterationArray = JSON.stringify(currentDropDownArray[i].review_id);
      if (currentlyShowingJSON.indexOf(currentIterationArray) === -1) {
        setCurrentlyShowing((previousState) => previousState.concat(currentDropDownArray[i]));
        count++;
      }
      if (count === 2) {
        break;
      }
    }
  };

  var resetFilter = () => {
    var currentDropDown = document.getElementById('currentDrop').innerText;
    if (currentDropDown === 'newest') {
      setCurrentlyShowing(sortedReviews.slice(0, 2));
    } else if (currentDropDown === 'relevance') {
      setCurrentlyShowing(storedReviews.slice(0, 2));
    } else if (currentDropDown === 'helpful') {
      setCurrentlyShowing(helpfulReviews.slice(0, 2));
    }
    setCurrentFilterArray([]);
    resetFilterState();
  };

  var resetFilterState = () => {
    var fiveStarId = document.getElementById('5Stars');
    var fourStarId = document.getElementById('4Stars');
    var threeStarId = document.getElementById('3Stars');
    var twoStarId = document.getElementById('2Stars');
    var oneStarId = document.getElementById('1Stars');
    fiveStarId.className = 'numRating';
    fourStarId.className = 'numRating';
    threeStarId.className = 'numRating';
    twoStarId.className = 'numRating';
    oneStarId.className = 'numRating';
  };



  var handleReviewModalClose = () => {
    var modal = document.getElementById('reviewModal');
    modal.style.display = 'none';
  };

  var handleReviewSubmission = (event) => {
    event.preventDefault();
  };

  var convertDate = (string) => {
    var strDate = string.substring(0, 10);
    var readableDate = new Date(strDate);
    var returnedDate = readableDate.toString().substring(0, 10);
    return returnedDate;
  };

  var dropDown = (event) => {
    var currentlyShowingSort = document.getElementById('currentDrop');
    var selectedDropDownText = event.target;
    var temp = currentlyShowingSort.innerHTML;
    currentlyShowingSort.innerHTML = selectedDropDownText.innerHTML;
    selectedDropDownText.innerHTML = temp;

    if (currentlyShowingSort.innerHTML === 'newest') {
      setCurrentlyShowing(() => sortedReviews.slice(0, 2));
    } else if (currentlyShowingSort.innerHTML === 'helpful') {
      setCurrentlyShowing(() => helpfulReviews.slice(0, 2));
    } else if (currentlyShowingSort.innerHTML === 'relevance') {
      setCurrentlyShowing(() => storedReviews.slice(0, 2));
    }
    setCurrentFilterArray([]);
    resetFilter();
  };

  var postRequestObject = {};
  var recommended = '';
  var submission = (event) => {
    postRequestObject['rating'] = document.getElementById('rating').value;
    postRequestObject['summary'] = document.getElementById('reviewSummary').value;
    postRequestObject['body'] = document.getElementById('reviewBody').value;
    postRequestObject['summary'] = document.getElementById('reviewSummary').value;
    postRequestObject['email'] = document.getElementById('reviewEmail').value;
    postRequestObject['nickname'] = document.getElementById('reviewNickName').value;
    axios.post('/submitReview', postRequestObject);
    event.preventDefault();
  };

  var setRecommended = (string) => {
    recommended = string;
    postRequestObject['recommended'] = string;
  };

  var handleAddReview = () => {
    fetchCurrentCharacteristics();
    var modal = document.getElementById('reviewModal');
    modal.style.display = 'block';
  };

  var fetchCurrentCharacteristics = () => {
    axios.get('/fetchCurrentCharacteristics', { params: { productId: productId } })
      .then((response) => {
        var currentCharacteristics = response.data.characteristics;
        var count = 1;
        for (var key in currentCharacteristics) {
          var char = document.getElementById(`char${count}`);
          char.className = 'notHidden';
          char.innerText = '';
          char.innerText += key;
          count++;
        }
      });
  };

  return (
    <div className="ReviewsOverview" id="jumpEntry">
      <RatingEntry
        currentProductId={productId}
        setRating={setRating}
        currentlyShowing={currentlyShowing}
        setCurrentlyShowing={setCurrentlyShowing}
        fiveStarReviews={fiveStarReviews}
        fourStarReviews={fourStarReviews}
        threeStarReviews={threeStarReviews}
        twoStarReviews={twoStarReviews}
        oneStarReviews={oneStarReviews}
        storedReviews={storedReviews}
        sortedReviews={sortedReviews}
        currentFilterArray={currentFilterArray}
        setCurrentFilterArray={setCurrentFilterArray}
        masterListOfReviews={masterListOfReviews}
        setHelpfulReviews={setHelpfulReviews}
        helpfulReviews={helpfulReviews} />

      <div className='reviewEntry'>
        <div className='numberOfReviews'>{masterListOfReviews.length} reviews, sorted by {' '}
          <div className="dropdown" id='dropdown'>
            <span id='currentDrop'>relevance</span>
            <div className="dropdown-content">
              <p id='dropDownOption1' onClick={dropDown}>newest</p>
              <p id='dropDownOption2' onClick={dropDown}>helpful</p>
            </div>
          </div></div>
        {currentlyShowing.length > 0 ?
          currentlyShowing.map((review) =>
            <div className='individualReview' key={review.review_id}>
              <div className='reviewHeader'>
                <div className='ratingReview' id='alignleft'><StarsRating count={5} value={review.rating} edit={false}/></div>
                <p className='reviewDateAndName' id='alignright'>{review.reviewer_name + ', ' + ' ' + convertDate(review.date)}</p>
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
            <div id="reviewModal" className="modal" style={{'color': 'black'}}>
              <div className="addReview-modal-content">
                <h1 className='writeReviewHeader'>Write your Review!</h1>
                <form id='submitReview'>
                  <div id='reviewModalFormatted'>
                    <div className='column1'>
                      <div className='addNickName'>
                        Nickname:
                        <input type="text" placeholder='Jackson11' id='reviewNickName'></input>
                        <br></br>
                        For privacy reasons, do not use your full name or email address
                      </div>
                      <div className='addEmail'>
                        Email:
                        <input type="email" id="reviewEmail" size="30" id='reviewEmail' required></input>
                        <br></br>
                        For authentication reasons, you will not be emailed
                      </div>
                      <div className='characteristics'>
                        Characteristics:
                        <div id='char1' className='hidden'>
                        </div>
                        <select name='rating'>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Average</option>
                          <option value="4">4 - Good</option>
                          <option value="5">5 - Great</option>
                        </select>

                        <div id='char2' className='hidden'>
                        </div>
                        <select name='rating'>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Average</option>
                          <option value="4">4 - Good</option>
                          <option value="5">5 - Great</option>
                        </select>

                        <div id='char3' className='hidden'>
                        </div>
                        <select name='rating'>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Average</option>
                          <option value="4">4 - Good</option>
                          <option value="5">5 - Great</option>
                        </select>
                        <div id='char4' className='hidden'>
                        </div>
                        <select name='rating'>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Average</option>
                          <option value="4">4 - Good</option>
                          <option value="5">5 - Great</option>
                        </select>
                        <div id='char5' id='rating' className='hidden'>
                          <select name='rating' className='hidden'>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Average</option>
                            <option value="4">4 - Good</option>
                            <option value="5">5 - Great</option>
                          </select>
                        </div>
                      </div>
                      <br></br>
                      <label htmlFor='rating' className='boldRating'>Overall Rating</label>
                      <br></br>
                      <select name='rating' id='rating'>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Average</option>
                        <option value="4">4 - Good</option>
                        <option value="5">5 - Great</option>
                      </select>

                      <br></br>
                      <label htmlFor='recommend'>Do you recommend this product?</label>
                      Yes
                      <input type="radio" name="option" value="Yes" onClick={function () { setRecommended('No'); }}></input>
                      No
                      <input type="radio" name="option" value="No" onClick={function () { setRecommended('No'); }} ></input>

                      <br></br>

                    </div>
                    <div className='column2'>

                      Summary
                      <br></br>
                      <textarea cols='30' rows='10' id='reviewSummary' placeholder='Example: Best purchase ever!'></textarea>
                      <br></br>
                      Body
                      <br></br>
                      <textarea cols='30' rows='10' id='reviewBody' placeholder='Why did you like the product or not?'></textarea>

                    </div>

                    <div className='column3'>

                      <label htmlFor="myfile">Select up to 5 photos: </label>
                      <div>
                        <input type="file" className="photoUploadReview"></input>
                        <input type="file" className="photoUploadReview"></input>
                        <input type="file" className="photoUploadReview"></input>
                        <input type="file" className="photoUploadReview"></input>
                        <input type="file" className="photoUploadReview"></input>
                      </div>
                      <div>
                        <input type="submit" id='reviewSubmission' value="Submit" onClick={submission}></input>
                      </div>

                    </div>
                    <span className="close" onClick={handleReviewModalClose}>&times;</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ReviewEntry;
