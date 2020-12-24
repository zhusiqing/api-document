import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Router from './router';
import { getUserInfo } from '@services/user';
import { UserInfoContext } from '@/context';
import './App.css';

function App() {
  const [userInfo, updateUserInfo] = useState({})
  const history = useHistory();
  window.addEventListener('router:change', e => {
    console.log(e);
    history.push('/login')
  });
  async function fetchUserInfo() {
    const { success, data = {} } = await getUserInfo();
    if (success) {
      updateUserInfo(data)
    }
  };
  useEffect(() => {
    fetchUserInfo()
  }, []);
  return (
    <div className="App">
      <UserInfoContext.Provider value={userInfo}>
        <Router/>
      </UserInfoContext.Provider>
    </div>
  );
}

export default App;