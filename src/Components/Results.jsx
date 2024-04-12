import React from 'react';

function Results({ userData, reposData }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={userData.avatar_url} alt="Avatar" style={{ marginRight: '10px', width: '50px', height: '50px', borderRadius: '50%' }} />
        <div>
          <h2>{userData.name}</h2>
          <p>Username: {userData.login}</p>
          <p>Location: {userData.location}</p>
          <p>Bio: {userData.bio}</p>
        </div>
      </div>
      <div>
        <h3>Repositories:</h3>
        <ul>
          {reposData.map(repo => (
            <li key={repo.id}>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Results;
