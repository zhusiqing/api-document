import { UserInfoContext } from '@/context';
import { useContext } from 'react';
import { Dropdown, Menu, notification, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { logout } from '@services/user';
export default function Header () {
  const userInfo = useContext(UserInfoContext);
  const history = useHistory();
  const isLogin = userInfo.username;
  async function fetchLogout() {
    const { success } = await logout()
    if (success) {
      notification.success({
        message: '退出登录成功'
      });
      history.push('/login');
    };
  };
  function toLoginPage() {
    history.push('/login');
  }
  const menu = (
    <Menu>
      <Menu.Item>
        { isLogin ? <span onClick={fetchLogout}>退出登录</span> : <span onClick={toLoginPage}>用户登录</span> }
      </Menu.Item>
    </Menu>
  )
  return (
    <header className="header">
      <div className="container">
        <div className="logo">1</div>
        <div className="nav">1</div>
        <div className="operate">
          <Dropdown overlay={menu} arrow>
            <Button type="text">{userInfo.username}</Button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};
