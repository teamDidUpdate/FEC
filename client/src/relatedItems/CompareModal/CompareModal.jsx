import React, { useState, useEffect, useContext } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { ThemeContext } from '../../App.jsx';

const CompareModal = ({ open, onClose, relatedProduct, productId }) => {
  if (!open) {
    return null;
  }

  const [overviewProduct, setOverviewProduct] = useState({});
  const [comparedFeatures, setComparedFeatures] = useState(null);
  const darkTheme = useContext(ThemeContext);

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
    let featureList = {};
    overviewProduct.features.forEach((obj) => {
      featureList[obj.feature] = [obj.value, ' '];
    });
    relatedProduct.overview.features.forEach((obj) => {
      if (featureList[obj.feature]) {
        featureList[obj.feature][1] = [obj.value];
      } else {
        featureList[obj.feature] = [' ', obj.value];
      }
    });
    setComparedFeatures(featureList);
  };

  return ReactDom.createPortal(
    <>
      <div className='overlay' onClick={onClose}
        style={{backgroundColor: darkTheme ? '#333' : '#000'}}
      />
      <div className='compare-modal'
        style={{color: darkTheme ? '#fff' : '#000', backgroundColor: darkTheme ? '#000' : '#fff'}}
      >
        <h2 className='modal-title'>Comparing</h2>
        <table className='compare-table'>
          <thead>
            <tr className='compare-header'>
              <th className='modal-header left'>{overviewProduct.name}</th>
              <th className='modal-header center'></th>
              <th className='modal-header right'>{relatedProduct.overview.name}</th>
            </tr>
          </thead>
          <tbody className='feature-list'>
            {comparedFeatures ?
              Object.keys(comparedFeatures).map((feature, index) => {
                return (
                  <tr key={index} className='compare-body' >
                    <td className='modal-body left'>{comparedFeatures[feature][0]}</td>
                    <td className='modal-body center'>{feature}</td>
                    <td className='modal-body right'>{comparedFeatures[feature][1]}</td>
                  </tr>
                );
              })
              : null
            }
          </tbody>
        </table>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default CompareModal;