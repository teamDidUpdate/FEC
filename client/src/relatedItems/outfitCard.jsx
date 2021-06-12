import React, { useState, useEffect } from 'react';
import {MdStarBorder} from 'react-icons/Md';
import StarsRating from 'stars-rating';

const OutfitCard = () => {

  const saveOutfit = (product) => {
    let allOutfits = {...outfits};
    allOutfits[PRODUCTID] = product;
    setOutfits(allOutfits);
    window.localStorage.removeItem('myThreads');
    window.localStorage.setItem('myThreads', JSON.stringify(allOutfits));
  };

  const removeOutfit = (product) => {
    let allOutfits = {...outfits};
    delete allOutfits[PRODUCTID];
    setOutfits(allOutfits);
    window.localStorage.removeItem('myThreads');
    window.localStorage.setItem('myThreads', JSON.stringify(allOutfits));
  };


  return (
    <>
    </>
  );
};

export default OutfitCard;
