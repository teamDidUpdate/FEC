import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import ProgressBar from '@ramonak/react-progress-bar';
import Stars from './stars.jsx';
import StarsRating from 'stars-rating';
import ReviewEntry from './ReviewEntry.jsx';


const RatingEntry = ({ currentProductId, setRating }) => {
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    axios.get('/fetchMeta', {params: { productId: currentProductId } } )
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
      total += key * object[key];
    }
    var result = total / (object[currentNumber] * currentNumber);
    return result;
  };

  var handleStarClick = function (event) {
    console.log(<ReviewEntry/>);
  };
  return (
    <div>

      {Object.keys(currentProduct).length > 0 ?
        <div>
          <div className='RatingsHeading'>Ratings {'&'} Reviews</div>
          <div className='StarAndQuarterRating'>
            <div className='quarterRating' >{calculate(currentProduct.ratings)}</div>
            <Stars calValue={calculate(currentProduct.ratings)} />
          </div>
          <div className='recommendationPercent'>{((Number(currentProduct.recommended.true) / (Number(currentProduct.recommended.false) + Number(currentProduct.recommended.true))) * 100).toString().substring(0, 2)}% of people recommend this product!</div>
          <div className='StarsGraphRating'>
            <div className='theStars' id='5Stars' onClick={handleStarClick}>5 Stars
              <div className='progressBar'><ProgressBar completed={Number(calculateEachAverage(currentProduct.ratings, '5'))} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} /></div></div>
            <div className='theStars' id='4Stars'>4 Stars<ProgressBar completed={Number(calculateEachAverage(currentProduct.ratings, '4'))} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} /></div>
            <div className='theStars' id='3Stars'>3 Stars<ProgressBar completed={Number(calculateEachAverage(currentProduct.ratings, '3'))} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} /></div>
            <div className='theStars' id='2Stars'>2 Stars<ProgressBar completed={Number(calculateEachAverage(currentProduct.ratings, '2'))} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} /></div>
            <div className='theStars' id='1Stars'>1 Stars<ProgressBar completed={Number(calculateEachAverage(currentProduct.ratings, '1'))} bgColor={'#00b300'} baseBgColor={'#d8d8d8'} isLabelVisible={false} borderRadius={'0'} height={'10px'} width={'100%'} /></div>
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
