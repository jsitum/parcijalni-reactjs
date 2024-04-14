import React, { Component } from 'react';
import './Results.css';

class Results extends Component {
  
  render() {
    const { userData, reposData, onReset } = this.props;

    return (
      <div className='result-wrapper'>
        <div className='info-container'>
          <img src={userData.avatar_url} alt="Avatar"/>
          <div>
            <h2>{userData.name}</h2>
            <p>Username: {userData.login}</p>
            <p>Location: {userData.location}</p>
            <p>Bio: {userData.bio}</p>
          </div>
        </div>
        <div className='repo-container'>
          <h3>Repositories:</h3>
          <ul>
            {reposData.map(repo => (
              <li key={repo.id}>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
        <button className='button' onClick={onReset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Results;

