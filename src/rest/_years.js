const Joi = require('joi');
const Router = require('@koa/router');
const yearService = require('../service/year');
const validate = require('./_validation');

const getAllYears = async (ctx) => {
  ctx.body = await yearService.getAll();
};
getAllYears.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
};

const getYearById = async (ctx) => {
  ctx.body = await yearService.getById(ctx.params.id);
};
getYearById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

const createYear = async (ctx) => {
  ctx.body = await yearService.create({
    ...ctx.request.body,
    startDate: new Date(ctx.request.body.startDate),
    endDate: new Date(ctx.request.body.endDate),
  });
};
createYear.validationScheme = {
  body: {
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  },
};

const updateYear = async (ctx) => {
  ctx.body = await yearService.updateById(ctx.params.id, {
    ...ctx.request.body,
    startDate: new Date(ctx.request.body.startDate),
    endDate: new Date(ctx.request.body.endDate),
  });
};
updateYear.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  },
};

const deleteYear = async (ctx) => {
  await yearService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteYear.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

/**
 * Install the routes for the years resource in the given router.
 *
 * @param {Router} app The router to install the routes in.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/years',
  });

  router.get('/', validate(getAllYears.validationScheme), getAllYears);
  router.get('/:id', validate(getYearById.validationScheme), getYearById);
  router.post('/', validate(createYear.validationScheme), createYear);
  router.put('/:id', validate(updateYear.validationScheme), updateYear);
  router.delete('/:id', validate(deleteYear.validationScheme), deleteYear);

  app.use(router.routes()).use(router.allowedMethods());
};
