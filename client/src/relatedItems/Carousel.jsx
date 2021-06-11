import React, {useState, useEffect} from 'react';
import RelatedCard from './RelatedCard.jsx';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/Md';
import { CSSTransition } from 'react-transition-group';

const Carousel = ({ products, setProductId }) => {
  const [current, setCurrent] = useState(0);
  const [length, setLength] = useState(4);
  const [scrollable, setScrollable] = useState({right: true, left: false});

  useEffect(() => {
    setLength(products.length);
    setCurrent(0);
  }, [products]);

  useEffect(() => {
    if (current + 3 >= length) {
      setScrollable({right: false, left: true});
    } else if (current === 0) {
      setScrollable({right: true, left: false});
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
          return (
            index >= current || current + 2 >= length ?
              <RelatedCard
                product={product}
                key={product.overview.id}
                setProductId={setProductId}/>
              : null
          );
        })}
      </div>
    </section>
  );
};

export default Carousel;