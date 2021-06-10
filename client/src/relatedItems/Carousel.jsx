import React, {useState, useEffect} from 'react';
import RelatedCard from './RelatedCard.jsx';
import {MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/Md';

const Carousel = ({ products }) => {
  const [current, setCurrent] = useState(0);
  const [length, setLength] = useState(products.length);

  // need to figure out why this rerenders when the `products` do not change
  useEffect(() => {
    setLength(products.length);
    setCurrent(0);
  }, [products]);

  const nextCard = () => {
    setCurrent(current >= length - 1 ? 0 : current + 1);
  };

  const prevCard = () => {
    setCurrent(current === 0 ? 0 : current - 1 );
  };

  if (!Array.isArray(products) || products.length <= 0) {
    return null;
  }

  return (
    <section className='carousel'>
      <MdKeyboardArrowLeft className='left-arrow' onClick={prevCard}/>
      <MdKeyboardArrowRight className='right-arrow' onClick={nextCard}/>
      {products.map((product, index) => {
        return (
          <RelatedCard product={product} id={product.overview.id}/>
        );
      })}
    </section>
  );
};

export default Carousel;