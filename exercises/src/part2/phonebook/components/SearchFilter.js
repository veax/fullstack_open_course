import React from "react";

const SearchFilter = ({ handleSearch }) => (
  <div>
    filter shown with <input type="text" onChange={handleSearch} />
  </div>
);

export default SearchFilter;
