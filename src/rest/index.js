const Router = require('@koa/router');
const installPersonRouter = require('./_people');
const installHealthRouter = require('./_health');
const installAddressRouter = require('./_addresses');

/**
 * Install all routes in the given Koa application.
 * 
 * @param {Koa} app The Koa application to install the routes in.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api'
  });

  installPersonRouter(router);
  installHealthRouter(router);
  installAddressRouter(router);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}
