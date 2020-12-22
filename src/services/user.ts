import { get, post } from '../request/';

export interface InterfaceLoginParams {
  username: string
  password: string
}

export async function login(params:InterfaceLoginParams) {
  return post('/api/login', params);
};

export async function logout() {
  return get('/api/logout');
};

export async function getUserInfo() {
  return get('/api/user-info');
};

