import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Router from './router';
import { getUserInfo } from '@services/user';
import { UserInfoContext } from '@/context';
import observer from './utils/observer'
import './App.css';
import 'antd/dist/antd.min.css';

function App() {
  const [userInfo, updateUserInfo] = useState({})
  const history = useHistory();
  // window.addEventListener('router:change', e => {
  //   console.log(e);
  //   history.push('/login')
  // });
  observer.on('router:change', (a) => {
    history.push(a)
  })
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
