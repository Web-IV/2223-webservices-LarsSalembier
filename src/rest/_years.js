const Router = require('@koa/router');
const yearService = require('../service/year');

const getAllYears = async (ctx) => {
  ctx.body = yearService.getAll();
}

const getYearById = async (ctx) => {
  ctx.body = yearService.getById(ctx.params.id);
}

const createYear = async (ctx) => {
  ctx.body = yearService.create({
    ...ctx.request.body,
    startDate: new Date(ctx.request.body.startDate),
    endDate: new Date(ctx.request.body.endDate),
  });
}

const updateYear = async (ctx) => {
  ctx.body = yearService.updateById(ctx.params.id, {
    ...ctx.request.body,
    startDate: new Date(ctx.request.body.startDate),
    endDate: new Date(ctx.request.body.endDate),
  });
}

const deleteYear = async (ctx) => {
  yearService.deleteById(ctx.params.id);
  ctx.status = 204;
}

/**
 * Install the routes for the years resource in the given router.
 * 
 * @param {Router} app The router to install the routes in.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/years'
  });

  router.get('/', getAllYears);
  router.get('/:id', getYearById);
  router.post('/', createYear);
  router.put('/:id', updateYear);
  router.delete('/:id', deleteYear);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}
