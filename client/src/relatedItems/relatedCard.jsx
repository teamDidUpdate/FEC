import React, { useState, useEffect } from 'react';

const RelatedCard = ({relatedItem}) => {
  const [action, setAction] = useState();
  const imageURL = relatedItem.styles.results[0].photos[0].thumbnail_url;

  return (
    <table className='related-items'>
      <tbody>
        <tr>
          <button onClick={() => console.log('PLACEHOLDER')}>Action</button>
          <td><img src={imageURL !== null ? imageURL : 'https://bit.ly/3507jj5'} height="100" width="100"></img></td>
          <td>{relatedItem.overview.category}</td>
          <td>{relatedItem.overview.name}</td>
          <td>{relatedItem.overview.default_price}</td>
        </tr>
      </tbody>
    </table>
  );
};


/*
  {element.photos.length > 0 ?
    <div className='reviewImages'>
      <img src={element.photos[0].url} height="100" width="100"></img>
    </div> :
    <img src=''></img>
  }
*/
export default RelatedCard;