import React, { useState, useEffect } from 'react';


const Search = ({ handleSearch }) => {

  const handleFocus = (event) => {
    event.preventDefault();
    const { target } = event;
    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div>
      <form className='qa-search'>
        <input style={{
          fontSize: 14,
          fontWeight: 600,
          marginLeft: 10,
          marginBottom: 10,
        }}
        className='qa-search-bar'
        placeholder='Search for Answers...'
        onChange={event => handleSearch(event.target.value)}
        onFocus={handleFocus}></input>
      </form>
      {/* <input className='qa-searchbar' type='text' placeholder='Search for Answers...'></input> */}
    </div>
  );
};

export default Search;

