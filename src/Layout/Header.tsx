import { UserInfoContext } from '@/context';
import { useContext, useState } from 'react';
import { Dropdown, Menu, notification, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useHistory, NavLink } from 'react-router-dom';
import { logout } from '@services/user';
export default function Header () {
  const userInfo = useContext(UserInfoContext);
  const history = useHistory();
  const [visible, updateVisible] = useState(false);
  const isLogin = userInfo.username;
  async function fetchLogout() {
    const { success } = await logout();
    if (success) {
      notification.success({
        message: '退出登录成功'
      });
      history.push('/login');
    };
  };
  function toLoginPage() {
    history.push('/login');
  };
  function onVisibleChange(isShow:boolean) {
    updateVisible(isShow);
  };
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
        <div className="logo"></div>
        <ul className="nav">
          <li>
            <NavLink to="/" exact>首页</NavLink>
          </li>
          <li>
            <NavLink to="/document">文档</NavLink>
          </li>
          <li>
            <NavLink to="/about">关于</NavLink>
          </li>
        </ul>
        <div className="operate">
          <Dropdown overlay={menu} arrow onVisibleChange={onVisibleChange}>
            <Button type="text">
              {userInfo.username}
              <DownOutlined className="icon" rotate={ visible ? 180 : 0 } />
            </Button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};
