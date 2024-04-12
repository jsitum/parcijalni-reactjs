import React, { useState } from 'react';
import SearchForm from './SearchForm';
import Results from './Results'; 

function FetchGitUser() {
  const [searchGit, setSearchGit] = useState('');
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState([]);
  
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
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      });

    fetch(reposApiUrl)
      .then(response => response.json())
      .then(data => {
        setReposData(data);
      });
  };

  return (
    <div>
      <SearchForm 
        onSubmit={handleSubmit}
        value={searchGit}
        onChange={handleInputChange}
      />
      {userData && <Results userData={userData} reposData={reposData} />}
    </div>
  );
}

export default FetchGitUser;
