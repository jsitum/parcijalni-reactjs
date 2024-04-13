import React, { useState } from 'react';
import SearchForm from './SearchForm';
import Results from './Results'; 

function FetchGitUser() {
  const [searchGit, setSearchGit] = useState('');
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [error, setError] = useState(null);
  
  const handleInputChange = (event) => {
    setSearchGit(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchUserAndReposData(searchGit);
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
    <div>
      <SearchForm 
        onSubmit={handleSubmit}
        value={searchGit}
        onChange={handleInputChange}
      />
      {error && <div>{error}</div>}
      {userData && <Results userData={userData} reposData={reposData} />}
    </div>
  );
}

export default FetchGitUser;
