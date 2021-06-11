import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';
import axios from 'axios';

const RelatedItemsAndComparison = ({productId, setProductId}) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  // const [productLocation, setProductLocation] = useState(0);
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // const [scrollable, setScrollable] = useState({left: false, right: true});

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
    <Carousel products={relatedProducts} />
  );
};

export default RelatedItemsAndComparison;