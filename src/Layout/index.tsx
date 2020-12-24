import React, { PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';
import './index.scss';

const LayoutComponent = (props: PropsWithChildren<{}> ) => {
  return (
    <div className="layout">
      <Header></Header>
      <section className="content">
        {props.children}
      </section>
      <Footer></Footer>
    </div>
  )
};

export default LayoutComponent;
