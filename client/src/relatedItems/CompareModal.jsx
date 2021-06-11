import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

const CompareModal = ({ open, onClose, relatedProduct, productId }) => {
  if (!open) {
    return null;
  }

  const [overviewProduct, setOverviewProduct] = useState({});
  const [features, setFeatures] = useState(null);

  useEffect(() => {
    axios.get('/overview', { params: { productId: productId } })
      .then((response) => {
        setOverviewProduct(response.data.overview);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [productId]);

  useEffect(() => {
    Object.keys(overviewProduct).length !== 0 ? getCompareList() : null;
  }, [overviewProduct]);

  const getCompareList = () => {
    let featuresList = {};
    overviewProduct.features.forEach((obj) => {
      console.log(obj.feature);
    });
  };

  return ReactDom.createPortal(
    <>
      <div className='overlay' onClick={onClose}/>
      <div className='compare-modal'>
        <h2>Compare Products</h2>
        <table>
          <thead>
            <tr>
              <th className='modal-header'>{overviewProduct.name}</th>
              <th className='modal-header'>Features</th>
              <th className='modal-header'>{relatedProduct.overview.name}</th>
            </tr>
          </thead>
          <tbody>
            {}
          </tbody>
        </table>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default CompareModal;