import React, { PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';
import './index.scss';

const LayoutComponent = (props: PropsWithChildren<{}> ) => {
  return (
    <div>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </div>
  )
};

export default LayoutComponent;
