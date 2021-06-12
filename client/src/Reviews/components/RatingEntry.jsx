import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import ProgressBar from '@ramonak/react-progress-bar';
import Stars from './stars.jsx';
import StarsRating from 'stars-rating';
import ReviewEntry from './ReviewEntry.jsx';


const RatingEntry = ({ currentProductId, setRating, currentlyShowing, setCurrentlyShowing, fiveStarReviews, fourStarReviews, threeStarReviews, twoStarReviews, oneStarReviews, storedReviews }) => {
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentFilter, setCurrentFilter] = useState('');

  useEffect(() => {
    axios.get('/fetchMeta', { params: { productId: currentProductId } })
      .then((response) => {
        setCurrentProduct(response.data);
      });
  }, [currentProductId]);


  var calculate = function (object) {
    var sum = 0;
    var quant = 0;
    for (var key in object) {
      sum = sum + (Number(key) * Number(object[key]));
      quant += Number(object[key]);
    }
    var number = sum / quant;
    return Number((Math.round(number * 4) / 4).toFixed(2));
  };

  useEffect(() => {
    setRating(calculate(currentProduct.ratings));
  }, [currentProduct]);

  var calculateEachAverage = (object, currentNumber) => {
    var total = 0;
    for (var key in object) {
      total += Number(object[key]);
    }
    var result = object[currentNumber] / total;
    return result * 100;
  };

  var handleStarClick = function (event) {
    var length = document.getElementsByClassName('numRatingClickedTrue').length;
    if (length === 0) {
      setCurrentlyShowing([]);
      setCurrentFilter(()=> '');
    }
    var currentStar = event.target.innerText.toString()[0];
    var clickedYet = document.getElementById(currentStar + 'Stars');

    if (clickedYet.className === 'numRating') {
      clickedYet.className += 'ClickedTrue';
      if (currentStar === '5') {
        setCurrentlyShowing((previousState) => previousState.concat(fiveStarReviews));
        setCurrentFilter((previousState)=> previousState + ' 5 Stars ');
      }

      if (currentStar === '4') {
        setCurrentlyShowing((previousState) => previousState.concat(fourStarReviews));
        setCurrentFilter((previousState)=> previousState + ' 4 Stars ');
      }

      if (currentStar === '3') {
        setCurrentlyShowing((previousState) => previousState.concat(threeStarReviews));
        setCurrentFilter((previousState)=> previousState + ' 3 Stars ');
      }

      if (currentStar === '2') {
        setCurrentlyShowing((previousState) => previousState.concat(twoStarReviews));
        setCurrentFilter((previousState)=> previousState + ' 2 Stars ');
      }

      if (currentStar === '1') {
        setCurrentlyShowing((previousState) => previousState.concat(oneStarReviews));
        setCurrentFilter((previousState)=> previousState + ' 1 Stars ');
      }

    } else {
      clickedYet.className = 'numRating';

      if (currentStar === '5') {
        setCurrentFilter((previousState) => previousState.replace('5 Stars', ' '));
        var tempArray = [];
        currentlyShowing.forEach((element) => {
          if (element.rating !== 5) {
            tempArray.push(element);
          }
        });
        setCurrentlyShowing(tempArray);
      }

      if (currentStar === '4') {
        setCurrentFilter((previousState) => previousState.replace('4 Stars', ' '));
        var tempArray = [];
        currentlyShowing.forEach((element) => {
          if (element.rating !== 4) {
            tempArray.push(element);
          }
        });
        setCurrentlyShowing(tempArray);
      }

      if (currentStar === '3') {
        setCurrentFilter((previousState) => previousState.replace('3 Stars', ' '));
        var tempArray = [];
        currentlyShowing.forEach((element) => {
          if (element.rating !== 3) {
            tempArray.push(element);
          }
        });
        setCurrentlyShowing(tempArray);
      }

      if (currentStar === '2') {
        setCurrentFilter((previousState) => previousState.replace('2 Stars', ' '));
        var tempArray = [];
        currentlyShowing.forEach((element) => {
          if (element.rating !== 2) {
            tempArray.push(element);
          }
        });
        setCurrentlyShowing(tempArray);
      }

      if (currentStar === '1') {
        setCurrentFilter((previousState) => previousState.replace('1 Stars', ' '));
        var tempArray = [];
        currentlyShowing.forEach((element) => {
          if (element.rating !== 1) {
            tempArray.push(element);
          }
        });
        setCurrentlyShowing(tempArray);
      }
    }

    if (document.getElementsByClassName('numRatingClickedTrue').length === 0) {
      setCurrentlyShowing(storedReviews.slice(0, 2));
    }
  };


  var copyOfStoredReviews = storedReviews.slice();
  var resetFilter = () => {
    setCurrentlyShowing(() => copyOfStoredReviews.slice(0, 2));
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


  return (
    <div>
      {Object.keys(currentProduct).length > 0 ?
        <div>
          <div className='RatingsHeading'>Ratings {'&'} Reviews </div>
          <div className='StarAndQuarterRating'>
            <div className='quarterRating' >{calculate(currentProduct.ratings)}</div>
            <Stars calValue={calculate(currentProduct.ratings)} />
          </div>
          <div className='recommendationPercent'>{((Number(currentProduct.recommended.true) / (Number(currentProduct.recommended.false) + Number(currentProduct.recommended.true))) * 100).toString().substring(0, 2)}% of people recommend this product!  </div>

          <div className='StarsGraphRating'>
            <div className='theStars'>
              <span className='numRating' id='5Stars' onClick={handleStarClick} value={5}>5 Stars</span>
              <div className='progressBar'>
                <ProgressBar completed={Number(calculateEachAverage(currentProduct.ratings, '5'))} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} />
              </div>
            </div>

            <div className='theStars'>
              <span className='numRating' id='4Stars' onClick={handleStarClick} value={4}>4 Stars</span>
              <ProgressBar completed={Number(calculateEachAverage(currentProduct.ratings, '4'))} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} />
            </div>

            <div className='theStars'>
              <span className='numRating' id='3Stars' onClick={handleStarClick} >3 Stars</span>
              <ProgressBar completed={Number(calculateEachAverage(currentProduct.ratings, '3'))} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} />
            </div>

            <div className='theStars'>
              <span className='numRating' id='2Stars' onClick={handleStarClick}>2 Stars</span>
              <ProgressBar completed={Number(calculateEachAverage(currentProduct.ratings, '2'))} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} />
            </div>

            <div className='theStars'>
              <span className='numRating' id='1Stars' onClick={handleStarClick}>1 Stars</span>
              <ProgressBar completed={Number(calculateEachAverage(currentProduct.ratings, '1'))} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} />
            </div>
            {document.getElementsByClassName('numRatingClickedTrue').length !== 0 ?
              <div className='filters'>
                <div id='currentFilters'> Current Filter: {currentFilter}
                </div>
                <div id='ratingReset' onClick={resetFilter}>Reset Filter</div>
              </div> :
              <div className='filters'>
                <div id='currentFilters' className='reviewHidden'>
                Current Filters:
                </div>
                <div id='ratingReset' onClick={resetFilter} className='reviewHidden' >Reset Filter</div>
              </div>
            }


          </div>
          <br></br>
          <div className='characteristics'>
            {currentProduct.characteristics.Fit !== undefined ?
              <div className='Fit'>Fitment
                <ProgressBar completed={(currentProduct.characteristics.Fit.value / 5) * 100} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} />
                <div className='characteristicsValues'>
                  <div className='characteristicsValuesLeft'>Runs tight</div>
                  <div className='characteristicsValuesRight'>Runs long</div>
                </div>
              </div> :
              null}

            {currentProduct.characteristics.Length !== undefined ?
              <div className='Length'>Length <ProgressBar completed={(currentProduct.characteristics.Length.value / 5) * 100} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} />
                <div className='characteristicsValues'>
                  <div className='characteristicsValuesLeft'>Runs Short</div>
                  <div className='characteristicsValuesRight'>Runs long</div>
                </div></div> :
              null}

            {currentProduct.characteristics.Comfort !== undefined ?
              <div className='Comfort'>Comfort<ProgressBar completed={(currentProduct.characteristics.Comfort.value / 5) * 100} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} />
                <div className='characteristicsValues'>
                  <div className='characteristicsValuesLeft'>Uncomfortable</div>
                  <div className='characteristicsValuesRight'>Perfect</div>
                </div></div> :
              null}

            {currentProduct.characteristics.Quality !== undefined ?
              <div className='Quality'>Quality<ProgressBar completed={(currentProduct.characteristics.Quality.value / 5) * 100} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} />
                <div className='characteristicsValues'>
                  <div className='characteristicsValuesLeft'>Poor</div>
                  <div className='characteristicsValuesRight'>Perfect</div>
                </div></div> :
              null}

          </div>
        </div> :
        null}
    </div>
  );
};


export default RatingEntry;
