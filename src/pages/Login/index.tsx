import { Form, Input, Button, notification } from 'antd';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import { InterfaceLoginParams, login } from '@/services/user';
import './index.scss';

const { Item } = Form;

const Login = (props: RouteComponentProps) => {
  const [form] = Form.useForm();
  const [loginStatus, updateLoginStatus] = useState(false)

  useEffect(() => {
    const formEl = document.querySelector('.login-page .form')
    const listener = (e: AnimationEventInit) => {
      if (e.animationName === 'loginSuccess') {
        props.history.push('/')
      }
    }
    formEl?.addEventListener('animationend', listener)
    return () => {
      formEl?.removeEventListener('animationend', listener)
    }
  });

  const onFinish = async ({ username, password }: InterfaceLoginParams) => {
    const params = {
      username,
      password: sha256(password)
    }
    const { success } = await login(params);
    if (success) {
      notification.success({
        message: '登录成功'
      })
      updateLoginStatus(true);
    }
  };

  return (
    <div className="login-page">
      <div className="background">
        <Form className={loginStatus ? 'form form-success' : 'form'} form={form} colon={false} requiredMark={false} onFinish={onFinish}>
          <Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="请输入用户名"></Input>
          </Item>
          <Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="请输入密码"></Input.Password>
          </Item>
          <Item className="login-btn">
            <Button type="primary" htmlType="submit">登录</Button>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
