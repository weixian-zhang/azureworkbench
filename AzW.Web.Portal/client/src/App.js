import React from 'react';
import logo from './logo.svg';
import './App.css';

import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { authProvider } from './authProvider';
const axios = require('axios').default;

async function getSubscriptions(){
  const token = await authProvider.getAccessToken();

  axios.defaults.baseURL = 'https://localhost:5001';
  axios.defaults.headers.common['Authorization'] = token.accessToken;
  axios.get('/api/arm/sub', {headers: {
    "Authorization" : "Bearer " + token.accessToken
  }
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });  
}

function App() {

  return (
    <div className="App">
      {/* https://www.npmjs.com/package/react-aad-msal */}
      <AzureAD provider={authProvider}>
        {
          ({login, logout, authenticationState, error, accountInfo}) => {
            switch (authenticationState) {
              case AuthenticationState.Authenticated:
                return (
                  <div>
                  <p>
                    <span>Welcome, {accountInfo.account.name}!</span>
                    <button onClick={logout}>Logout</button>
                  </p>
                  <p>
                    <button onClick={getSubscriptions}>Get Subscriptions</button>
                  </p>
                  </div>
                );
              case AuthenticationState.Unauthenticated:
                return (
                  <div>
                    {error && <p><span>An error occured during authentication, please try again!</span></p>}
                    <p>
                      <span>Hey stranger, you look new!</span>
                      <button onClick={login}>Login</button>
                    </p>
                  </div>
                );
              case AuthenticationState.InProgress:
                return (<p>Authenticating...</p>);
            }
          }
        }
      </AzureAD>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
