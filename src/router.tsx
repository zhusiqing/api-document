import React, { PropsWithChildren } from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import FormPage from './pages/Form';
import Layout from '@/Layout';

const LayoutComponent = (props: PropsWithChildren<RouteProps>) => (
  <Layout>
    { props.children }
  </Layout>
)
const RenderComponent = (page:string) => (props: RouteProps) => {
  let C
  switch (page) {
    case 'Home':
      C = Home
      break;
    case 'FormPage':
      C = FormPage
      break;
    default:
      C = NotFound
      break;
  }
  return (
    <LayoutComponent { ...props }>
      <C/>
    </LayoutComponent>
  )
}

const Router = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" render={ RenderComponent('Home') } />
        <Route path="/document/edit" render={ RenderComponent('FormPage') } />
        <Route path="/login" component={Login} />
        <Route path="/404" component={NotFound}/>
        <Redirect to="/404" />
      </Switch>
    </React.Fragment>
  );
};

export default Router;
