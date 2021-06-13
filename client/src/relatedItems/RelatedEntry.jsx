import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

const RelatedItemsAndComparison = ({productId, setProductId, overviewProduct, overviewRating}) => {
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [outfits, setOutfits] = useState(null);

  // get saved outfits on inital render
  useEffect(() => {
    const savedOutfits = JSON.parse(window.localStorage.getItem('myThreads'));
    savedOutfits ? setOutfits(savedOutfits) : null;
  }, [productId]);

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

  return (
    <>
      <h2 className='section-header'>RELATED PRODUCTS</h2>
      <CSSTransition
        in={relatedProducts}
        appear={true}
        timeout={3000}
        classNames="fade"
        unmountOnExit
      >
        <Carousel
          related={true}
          products={relatedProducts}
          productId={productId}
          setProductId={setProductId}
          overviewProduct={overviewProduct}
          overviewRating={overviewRating}
        />
      </CSSTransition>
      <h2 className='section-header'>YOUR OUTFIT</h2>
      <CSSTransition
        in={relatedProducts}
        appear={true}
        timeout={3000}
        classNames="fade"
        unmountOnExit
      >
        <Carousel
          related={false}
          products={outfits}
          productId={productId}
          setProductId={setProductId}
          setOutfits={setOutfits}
          overviewProduct={overviewProduct}
          overviewRating={overviewRating}
        />
      </CSSTransition>
    </>
  );
};

export default RelatedItemsAndComparison;