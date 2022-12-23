const Joi = require("joi");
const Router = require("@koa/router");
const healthService = require("../service/health");
const validate = require("./_validation");

const ping = async (ctx) => {
  ctx.body = healthService.ping();
};
ping.validationScheme = null;

const getVersion = async (ctx) => {
  ctx.body = healthService.getVersion();
};
getVersion.validationScheme = null;

/**
 * Install health routes on the given router.
 *
 * @param {Router} app The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/health",
  });

  router.get("/ping", validate(ping.validationScheme), ping);
  router.get("/version", validate(getVersion.validationScheme), getVersion);

  app.use(router.routes()).use(router.allowedMethods());
};
