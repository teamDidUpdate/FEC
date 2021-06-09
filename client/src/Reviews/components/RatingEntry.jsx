import React from 'react';
import axios from 'axios';
import APIToken from '../../../../config.js';
class RatingEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metadata: {}
    };
  }
  componentDidMount() {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/reviews/meta/?product_id=${this.props.productId}`, {
      headers: {
        Authorization: APIToken.TOKEN
      }
    })
      .then((response) => {
        for (var key in response.data) {
          this.state.metadata[key] = response.data[key];
        }
      });
  }

  calculateQuarterRating(object) {
    var sum = 0;
    var quant = 0;
    for (var key in object) {
      sum = sum + (Number(key) * Number(object[key]));
      quant += Number(object[key]);
    }
    var number = sum / quant;
    return (Math.round(number * 4) / 4).toFixed(2);

  }
  render() {
    return (
      <div>
        <div className='RatingsHeading'>Ratings and Reviews</div>

        {Object.keys(this.state.metadata).length > 0 ?
          <div>
            <div className='quarterRating'>{this.calculateQuarterRating(this.state.metadata.ratings)}</div>
            <div className='recommendationPercent'>{Math.floor((Number(this.state.metadata.recommended.true) / (Number(this.state.metadata.recommended.false) + Number(this.state.metadata.recommended.true)) * 100))}% of people recommend this product. </div>
            <div className='fiveStars'>5 Stars {this.state.metadata.ratings[5]} </div>
            <div className='fourStars'>4 Stars {this.state.metadata.ratings[4]}</div>
            <div className='threeStars'>3 Stars {this.state.metadata.ratings[3]}</div>
            <div className='twoStars'>2 Stars {this.state.metadata.ratings[2]}</div>
            <div className='oneStars'>1 Stars {this.state.metadata.ratings[1]}</div>

          </div>

          :
          null}


      </div>
    );

  }
}


export default RatingEntry;
