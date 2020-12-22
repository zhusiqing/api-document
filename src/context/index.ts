import React from 'react';

interface InterfaceUserInfoContext {
  username?: string
  _id?: string
}
const initValue: InterfaceUserInfoContext = {}
export const UserInfoContext = React.createContext(initValue);
