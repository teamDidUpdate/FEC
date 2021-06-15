import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const SectionTracker = ({sectionName, render}) => {
  // begin tracking for section
  useEffect(() => {
    document.getElementById(sectionName).addEventListener('click', handleTrackingClick);
  }, []);

  // console.log('section name is ', sectionName);

  // pass handle tracking clicks to children
  const handleTrackingClick = async (event) => {
    let data = {};
    data.time = new Date();
    data.element = await event.target.outerHTML.toString();
    data.widget = sectionName;

    // console.log(`tracking click for ${JSON.stringify(data)}`);

    await axios.post('/tracking', data)
      .then((response) => {
        // console.log(response);
        return;
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  return (
    <>
      {render(handleTrackingClick)}
    </>
  );
};

export default SectionTracker;