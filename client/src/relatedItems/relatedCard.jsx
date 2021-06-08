import React, { useState, useEffect } from 'react';

const RelatedCard = ({relatedItem}) => {
  const [action, setAction] = useState();

  return (
    <table className='related-items'>
      <tbody>
        <tr key={relatedItem.id}>
          <td>{relatedItem.category}</td>
          <td>{relatedItem.name}</td>
          <td>{relatedItem.default_price}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default RelatedCard;