import React from 'react';

function SearchForm({ onSubmit, value, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter GitHub username"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
