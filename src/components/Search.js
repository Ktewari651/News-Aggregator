'use client'

import React, { useState } from 'react';

const Search = (props) => {
  const [query, setQuery] = useState("");

  console.log("Props", props)

const searchHandler = (e) =>{
    setQuery(e.target.value)
   props.onSearch(e.target.value)
}

  return (
    <div className="search-container">
      <input 
        type="text"
        className="search-input"
        placeholder="Search"
        value={query} 
        onChange={searchHandler}
      />
    </div>
  );
};

export default Search;
