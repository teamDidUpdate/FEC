import React, {useState, useEffect} from 'react';
import RelatedCard from './RelatedCard.jsx';
import OutfitCard from './OutfitCard.jsx';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/Md';
import { FiPlusCircle } from 'react-icons/Fi';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';

const Carousel = ({ products, productId, setProductId, related, overviewProduct, overviewRating, setOutfits}) => {
  const [productWithRating, setProductWithRating] = useState({});
  const [currentPos, setCurrentPos] = useState(0);
  const [length, setLength] = useState(0);
  const [scrollable, setScrollable] = useState({right: false, left: false});

  // set varibles to determine scrollability
  useEffect(() => {
    if (related) {
      setLength(products.length);
    } else {
      setLength(Object.keys(products).length);
    }
    setCurrentPos(0);
  }, [products]);

  // combine the current overview product with its rating
  useEffect(() => {
    if (overviewProduct && overviewRating) {
      let combinedProd = {...overviewProduct};
      combinedProd['rating'] = overviewRating;
      setProductWithRating(combinedProd);
    }
  }, [overviewProduct, overviewRating]);

  // check to see if arrow buttons appear
  useEffect(() => {
    let buffer = related ? 3 : 2;
    if (currentPos === 0 && currentPos + buffer >= length) {
      setScrollable({left: false, right: false});
    } else if (currentPos === 0 && currentPos + buffer < length) {
      setScrollable({left: false, right: true});
    } else if (currentPos !== 0 && currentPos + buffer >= length) {
      setScrollable({right: false, left: true});
    } else {
      setScrollable({right: true, left: true});
    }
  }, [currentPos, length]);

  const nextCard = () => {
    setCurrentPos(currentPos >= length - 1 ? length - 1 : currentPos + 1);
  };

  const prevCard = () => {
    setCurrentPos(currentPos <= 0 ? 0 : currentPos - 1 );
  };

  const getDefaultStyle = (prod) => {
    prod.styles.results.forEach(style => {
      if (style['default?'] === true) {
        return style;
      }
    });
    return prod.styles.results[0];
  };

  const getStarRating = async (id) => {
    let averageRating = 0;
    await axios.get('/getAverageRating', { params: { productId: id } })
      .then((response) => {
        averageRating = response.data;
        return;
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    return averageRating;
  };

  const saveOutfit = () => {
    let allOutfits = {...products};
    allOutfits[productWithRating.overview.id] = productWithRating;
    setOutfits(allOutfits);
    window.localStorage.setItem('myThreads', JSON.stringify(allOutfits));
  };

  const deleteOutfit = (id) => {
    let allOutfits = {...products};
    delete allOutfits[id];
    setOutfits(allOutfits);
    window.localStorage.removeItem('myThreads');
    window.localStorage.setItem('myThreads', JSON.stringify(allOutfits));
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
        { length !== 0 && related ?
          products.map((product, index) => {
            return (
              index >= currentPos || currentPos + 2 >= length ?
                <RelatedCard
                  key={Math.random() * 100000 + 1}
                  product={product}
                  productId={productId}
                  setProductId={setProductId}
                  getStarRating={getStarRating}
                  getDefaultStyle={getDefaultStyle}
                />
                : null
            );
          })
          : null
        }
        {!related ?
          <div className='empty-card' onClick={() => saveOutfit()}>
            <h2>Add to Outfit</h2>
            <FiPlusCircle id='add-outfit-btn' />
          </div>
          : null }
        { length !== 0 && !related ?
          Object.values(products).map((product, index) => {
            return (
              index >= currentPos || currentPos + 1 >= length ?
                <OutfitCard
                  key={Math.random() * 100000 + 1}
                  outfit={product}
                  productId={productId}
                  setProductId={setProductId}
                  getDefaultStyle={getDefaultStyle}
                  deleteOutfit={deleteOutfit}
                />
                : null
            );
          })
          : null
        }
      </div>
    </section>
  );
};

export default Carousel;