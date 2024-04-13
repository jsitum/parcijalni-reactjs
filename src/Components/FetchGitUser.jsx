import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import Results from './Results';
import './FetchGitUser.css' 

function FetchGitUser() {
  const [searchGit, setSearchGit] = useState('');
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedSearch = localStorage.getItem('searchGit');
    if (storedSearch) {
      setSearchGit(storedSearch);
      fetchUserAndReposData(storedSearch);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchGit', searchGit);
  }, [searchGit]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  const handleInputChange = (event) => {
    setSearchGit(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchUserAndReposData(searchGit);
  };

  const handleReset = () => {
    setSearchGit('');
    setUserData(null);
    setReposData([]);
    setError(null);
    localStorage.removeItem('userData');
  };
  
  const fetchUserAndReposData = (searchGit) => {
    const userApiUrl = `https://api.github.com/users/${searchGit}`;
    const reposApiUrl = `https://api.github.com/users/${searchGit}/repos`;
    
    fetch(userApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
        setError(null);
      })
      .catch(error => {
        setError(error.message);
        setUserData(null);
      });

    fetch(reposApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching repositories');
        }
        return response.json();
      })
      .then(data => {
        setReposData(data);
        setError(null);
      })
      .catch(error => {
        setError(error.message);
        setReposData([]);
      });
  };

  return (
    <div className='container'>
      <header><h1>GitHub Search Tool</h1></header>
      <SearchForm 
        onSubmit={handleSubmit}
        value={searchGit}
        onChange={handleInputChange}
      />
      {error && <div>{error}</div>}
      {userData && <Results userData={userData} reposData={reposData} onReset={handleReset}/>}
    </div>
  );
}

export default FetchGitUser;
