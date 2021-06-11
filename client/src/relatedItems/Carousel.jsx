import React, {useState, useEffect} from 'react';
import RelatedCard from './RelatedCard.jsx';
import {MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/Md';

const Carousel = ({ products }) => {
  const [current, setCurrent] = useState(0);
  const [length, setLength] = useState(products.length);
  const [scrollable, setScrollable] = useState({right: true, left: false});

  // need to figure out why this rerenders when the `products` do not change
  useEffect(() => {
    setLength(products.length);
    setCurrent(0);
  }, [products]);

  useEffect(() => {
    if (current + 3 >= length) {
      console.log(`current is ${current}, length is ${length}, and I'm setting right to false`);
      setScrollable((previousState) => {
        previousState.right = false;
        return previousState;
      });
    } else if (current === 0) {
      setScrollable((previousState) => {
        previousState.left = false;
        return previousState;
      });
    } else {
      setScrollable({right: true, left: true});
    }
  }, [current]);

  const nextCard = () => {
    setCurrent(current >= length - 1 ? length - 1 : current + 1);
  };

  const prevCard = () => {
    setCurrent(current <= 0 ? 0 : current - 1 );
  };

  if (!Array.isArray(products) || products.length <= 0) {
    return null;
  }

  return (
    <section className='carousel'>
      {scrollable.left ?
        <MdKeyboardArrowLeft className='left-arrow' onClick={prevCard}/>
        : null
      }
      {scrollable.right ?
        <MdKeyboardArrowRight className='right-arrow' onClick={nextCard}/>
        : null
      }
      <div className='cards-container'>
        {products.map((product, index) => {
          console.log(current);
          return (
            index >= current || current + 2 >= length ?
              <RelatedCard product={product} id={product.overview.id}/>
              : null
          );
        })}
      </div>
    </section>
  );
};

export default Carousel;