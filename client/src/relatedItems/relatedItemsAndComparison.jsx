import React, { useState, useEffect } from 'react';
import RelatedCard from './RelatedCard.jsx';
import axios from 'axios';

const RelatedItemsAndComparison = ({productId, setProductId}) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productLocation, setProductLocation] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [scrollable, setScrollable] = useState({left: false, right: true});

  // get related products when the productId changes
  useEffect(() => {
    axios.get('/relatedIds', { params: { productId: productId } })
      .then((response) => {
        let relatedIds = response.data;
        return getRelatedProducts(relatedIds);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [productId]);

  // gets related products for each id
  const getRelatedProducts = async (ids) => {
    try {
      let items = await ids.map(id => {
        return getRelatedProductById(id);
      });
      let relatedItems = await Promise.all(items);
      setRelatedProducts(relatedItems);
    } catch (err) {
      console.log(err);
    }
  };

  // fetches a related product from the server
  const getRelatedProductById = async (id) => {
    let relatedProduct = {};
    await axios.get('/relatedProduct', { params: { productId: id } })
      .then((response) => {
        relatedProduct = response.data;
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    return relatedProduct;
  };

  // check to see if related products should be scrollable
  // useEffect(() => {
  //   const screenBuffer = 200;
  //   let productWidth = document.getElementById('related-carousel').clientWidth;

  //   if (productWidth + screenBuffer < screenWidth) {
  //     setScrollable({ ...scrollable, right: false });
  //   }
  //   if (productWidth + screenBuffer < screenWidth) {
  //     setScrollable({ ...scrollable, right: true });
  //   }
  // }), [screenWidth];

  // determine if the left scroll button should display
  useEffect(() => {
    if (productLocation <= 0) {
      let temp = {...scrollable};
      temp.left = false;
      setScrollable(temp);
    } else if (productLocation > 0) {
      let temp = {...scrollable};
      temp.left = true;
      setScrollable(temp);
    }
  }, [productLocation]);

  // carousel functionality
  const moveCarousel = (direction, event) => {
    // think about how to refactor significan selection
    let area = event.target.parentNode.parentNode.children[1];
    let relatedWidth = event.target.parentNode.parentNode.children[1].children[1].clientWidth;

    if (direction === 'right') {
      area.scrollLeft += relatedWidth;
      let loc = area.scrollLeft + relatedWidth;
      setProductLocation(loc);
    } else {
      area.scrollLeft -= relatedWidth;
      let loc = area.scrollLeft - relatedWidth;
      setProductLocation(loc);
    }
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  return (
    <div className='related-items-and-comparison grid-outer-container' id='related-carousel'>
      <div>
        <h2>Related Products</h2>
      </div>
      <div className='related-wrapper'>
        {scrollable.left ?
          <button
            onClick={(e) => moveCarousel('left', e)}
          >
            LEFT
          </button> : null
        }
        <div className='relatedCardContainer grid-container'>
          {relatedProducts.length !== 0 ? relatedProducts.map(product => {
            return (
              <div
                className='related-card grid-item-container'
                key={product.overview.id}
                onClick={() => setProductId(product.overview.id)}
              >
                <RelatedCard product={product}/>
              </div>
            );
          }) : null}
        </div>
        {scrollable.right ?
          <button
            onClick={(e) => moveCarousel('right', e)}
          >
            RIGHT
          </button> : null
        }
      </div>
    </div>
  );
};

export default RelatedItemsAndComparison;