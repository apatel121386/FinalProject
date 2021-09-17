import React, { useState, useEffect } from 'react';
import { token } from '../spotify';

import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

const App = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    setAccessToken(token);
  }, []);

  return <div>{accessToken ? <HomePage /> : <LoginPage />}</div>;
};

export default App;
