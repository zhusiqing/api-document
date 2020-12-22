import { Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const { REACT_APP_URL } = process.env;

const setupProxy = (app: Application) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: REACT_APP_URL,
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log(proxyReq);
      }
    })
  );
};

export default setupProxy;
