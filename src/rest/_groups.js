const Joi = require('joi');
const Router = require('@koa/router');
const groupService = require('../service/group');
const validate = require('./_validation');

const getAllGroups = async (ctx) => {
  ctx.body = await groupService.getAll();
};
getAllGroups.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
};

const getGroupById = async (ctx) => {
  ctx.body = await groupService.getById(ctx.params.id);
};
getGroupById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

const createGroup = async (ctx) => {
  ctx.body = await groupService.create(ctx.request.body);
};
createGroup.validationScheme = {
  body: {
    name: Joi.string().required().max(255),
    color: Joi.string().required().max(255),
    mascot_name: Joi.string().optional().max(255),
    target_audience: Joi.string().required().max(255),
  },
};

const updateGroup = async (ctx) => {
  ctx.body = await groupService.updateById(ctx.params.id, ctx.request.body);
};
updateGroup.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    name: Joi.string().required().max(255),
    color: Joi.string().required().max(255),
    mascot_name: Joi.string().optional().max(255),
    target_audience: Joi.string().required().max(255),
  },
};

const deleteGroup = async (ctx) => {
  await groupService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteGroup.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

/**
 * Install group routes on the given router.
 *
 * @param {Router} app The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/groups',
  });

  router.get('/', validate(getAllGroups.validationScheme), getAllGroups);
  router.get('/:id', validate(getGroupById.validationScheme), getGroupById);
  router.post('/', validate(createGroup.validationScheme), createGroup);
  router.put('/:id', validate(updateGroup.validationScheme), updateGroup);
  router.delete('/:id', validate(deleteGroup.validationScheme), deleteGroup);

  app.use(router.routes()).use(router.allowedMethods());
};
