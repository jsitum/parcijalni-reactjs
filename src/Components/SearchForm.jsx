import React from 'react';
import './SearchForm.css';

function SearchForm({ onSubmit, value, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="">GitHub username:</label>
      <input className='input'
        type="text"
        value={value}
        onChange={onChange}
        placeholder="e.g. mmataja"
      />
      <button className='btn' type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
