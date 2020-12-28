import React, { Suspense, lazy, FunctionComponent } from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import About from '@/pages/About';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Layout from '@/Layout';
interface InterfaceRouteQueue {
  type: string
  callback: () => void
}

const routerQueue: Set<InterfaceRouteQueue> = new Set();
// const hook = {
//   beforeRouter: (callback: () => void) => {
//     routerQueue.add({
//       type: 'before',
//       callback
//     });
//   },
//   afterRouter: (callback: () => void) => {
//     routerQueue.add({
//       type: 'after',
//       callback
//     });
//   }
// }
// TODO: 所有组件增加路由钩子
const AsyncComponent = (Component: Promise<{default: (c: any) => JSX.Element}>, isLayout: boolean = true) => {
  function dispatch(type:string) {
    routerQueue.forEach(el => {
      if (el.type === type) {
        el.callback();
      };
    });
  }

  const LazyComponent = lazy(() => Component.then(res => {
    console.log('after');
    dispatch('after');
    return res
  }));
  return (props: RouteComponentProps<any>) => {
    console.log('before');
    dispatch('before')
    return (
      isLayout ? (
        <Layout {...props}>
          <LazyComponent {...props}></LazyComponent>
        </Layout>
      ) : (
        <LazyComponent {...props}></LazyComponent>
      )
    )
  }
}
const Document = AsyncComponent(import('@/pages/Document'));
const DocumentDetail = AsyncComponent(import('@/pages/Document/Detail'));
const FormPage = AsyncComponent(import('@/pages/Form'));

const LayoutComponent = (Component: FunctionComponent<any>) => (props: RouteComponentProps<any>) => {
  return (
    <Layout { ...props }>
      <Component {...props}></Component>
    </Layout>
  )
}
const Router = () => {
  // const history = useHistory()
  // hook.beforeRouter(() => {
  //   console.log('before:');
  // })
  // useEffect(() => {
  //   hook.afterRouter(() => {
  //     console.log('after:');
  //   })
  // })
  // history.listen((history) => {
  //   console.log(history);
  // })
  return (
    <React.Fragment>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route exact path="/" render={ LayoutComponent(Home) } />
          <Route exact path="/document" component={Document} />
          <Route exact path="/document/edit" component={ FormPage } />
          <Route exact path="/document/:id" component={DocumentDetail} />
          <Route path="/about" render={ LayoutComponent(About) } />
          {/* <Route path="/about" render={ RenderComponent('About') } /> */}

          <Route path="/login" component={Login} />
          <Route path="/404" component={NotFound}/>
          <Redirect to="/404" />
        </Switch>
      </Suspense>

    </React.Fragment>
  );
};

export default Router;
