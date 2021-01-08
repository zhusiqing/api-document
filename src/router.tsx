import React, { Suspense, lazy, FunctionComponent, ComponentProps } from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import NotFound from '@/pages/NotFound';
import About from '@/pages/About';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Layout from '@/Layout';

// TODO: 所有组件增加路由钩子
// type TypeCallback = () => void
// interface InterfaceRouteQueue {
//   type: string
//   callbackQueue: Set<TypeCallback>
// }

// interface InterfaceRouterQueue {
//   [index: string]: InterfaceRouteQueue
// }

// const routerQueue: InterfaceRouterQueue = {};
// const hook = {
//   beforeRouter: (callback: () => void) => {
//     const type = 'before'
//     if (routerQueue.hasOwnProperty(type)) {
//       console.log('++');
//       routerQueue[type].callbackQueue.add(callback)
//     } else {
//       console.log('+');
//       routerQueue[type] = {
//         type,
//         callbackQueue: new Set([callback])
//       }
//       console.log(routerQueue[type]);
//     }
//   },
//   afterRouter: (callback: () => void) => {
//     const type = 'after'
//     if (routerQueue.hasOwnProperty(type)) {
//       routerQueue[type].callbackQueue.add(callback)
//     } else {
//       routerQueue[type] = {
//         type,
//         callbackQueue: new Set([callback])
//       }
//     }
//   }
// }
// function dispatch(type:string) {
//   console.log(type, routerQueue[type].callbackQueue);
//   routerQueue[type].callbackQueue.forEach(callback => callback())
//   routerQueue[type] = {
//     type,
//     callbackQueue: new Set()
//   }
// }

const lifeCycleComponent = (Component: ComponentProps<any>) => {
  return class LifeCycleComponent extends React.Component {
    constructor(props: React.ComponentProps<any>) {
      super(props);
      Nprogress.start()
    };
    componentDidMount() {
      Nprogress.done()
    }
    componentWillUnmount() {
      Nprogress.start()
    }
    render() {
      return <Component { ...this.props }></Component>
    }
  };
}


const AsyncComponent = (Component: Promise<any>, isLayout: boolean = true) => {
  const LazyComponent = lazy(() => Component);
  const RenderComponent = lifeCycleComponent(LazyComponent)
  return (props: RouteComponentProps<any>) => {
    return (
      isLayout ? (
        <Layout {...props}>
          {/* <LazyComponent {...props}></LazyComponent> */}
          <RenderComponent {...props}></RenderComponent>
        </Layout>
      ) : (
        // <LazyComponent {...props}></LazyComponent>
        <RenderComponent {...props}></RenderComponent>
      )
    )
  }
}
const Document = AsyncComponent(import('./pages/Document'));
const DocumentDetail = AsyncComponent(import('./pages/Document/Detail'));
const FormPage = AsyncComponent(import('./pages/Form'));

const LayoutComponent = (Component: FunctionComponent<any>) => (props: RouteComponentProps<any>) => {
  const RenderComponent = lifeCycleComponent(Component)
  return (
    <Layout { ...props }>
      <RenderComponent {...props}></RenderComponent>
      {/* <Component {...props}></Component> */}
    </Layout>
  )
}
const Router = () => {
  // hook.beforeRouter(() => {
  //   console.log('before:');
  // })
  // hook.afterRouter(() => {
  //   console.log('after:');
  // })
  return (
    <React.Fragment>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route exact path="/" component={ LayoutComponent(Home) } />
          <Route exact path="/document" component={ Document } />
          <Route exact path="/document/edit" component={ FormPage } />
          <Route exact path="/document/:id" component={ DocumentDetail } />
          <Route path="/about" render={ LayoutComponent(About) } />
          {/* <Route path="/about" render={ RenderComponent('About') } /> */}

          <Route path="/login" component={ lifeCycleComponent(Login) } />
          <Route path="/404" component={ lifeCycleComponent(NotFound) }/>
          <Redirect to="/404" />
        </Switch>
      </Suspense>

    </React.Fragment>
  );
};

export const history = createBrowserHistory();

export default Router;
