const Router = require('@koa/router');
const installAddressRouter = require('./_addresses');
const installArticleRouter = require('./_articles');
const installEventRouter = require('./_events');
const installGroupRouter = require('./_groups');
const installHealthRouter = require('./_health');
const installLeaderRouter = require('./_leaders');
const installPersonRouter = require('./_persons');
const installYearRouter = require('./_years');

/**
 * Install all routes in the given Koa application.
 * 
 * @param {Koa} app The Koa application to install the routes in.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api'
  });

  installAddressRouter(router);
  installArticleRouter(router);
  installEventRouter(router);
  installGroupRouter(router);
  installHealthRouter(router);
  installLeaderRouter(router);
  installPersonRouter(router);
  installYearRouter(router);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}
