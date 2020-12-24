import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import About from '@/pages/About';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import FormPage from '@/pages/Form';
import Layout from '@/Layout';

const Document = lazy(() => import('@/pages/Document'));
const DocumentDetail = lazy(() => import('@/pages/Document/Detail'));

const RenderComponent = (page:string) => (props: RouteComponentProps<any>) => {
  let C
  switch (page) {
    case 'Home':
      C = Home
      break;
    case 'Document':
      C = Document
      break;
    case 'DocumentDetail':
      C = DocumentDetail;
      break;
    case 'FormPage':
      C = FormPage
      break;
    case 'About':
      C = About
      break;
    default:
      C = NotFound
      break;
  }
  return (
    <Layout { ...props }>
      <C { ...props }/>
    </Layout>
  )
}

const Router = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route exact path="/" render={ RenderComponent('Home') } />
          <Route exact path="/document" render={ RenderComponent('Document') } />
          <Route exact path="/document/edit" render={ RenderComponent('FormPage') } />
          <Route exact path="/document/:id" render={ RenderComponent('DocumentDetail') } />
          <Route path="/about" render={ RenderComponent('About') } />

          <Route path="/login" component={Login} />
          <Route path="/404" component={NotFound}/>
          <Redirect to="/404" />
        </Switch>
      </Suspense>

    </React.Fragment>
  );
};

export default Router;
