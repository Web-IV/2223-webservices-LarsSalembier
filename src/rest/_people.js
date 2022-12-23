const Joi = require('joi');
const Router = require('@koa/router');
const personService = require('../service/person');
const validate = require('./_validation');

const getAllPeople = async (ctx) => {
  ctx.body = await personService.getAll();
};
getAllPeople.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
};

const getPersonById = async (ctx) => {
  ctx.body = await personService.getById(ctx.params.id);
};
getPersonById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

const createPerson = async (ctx) => {
  ctx.body = await personService.create({
    ...ctx.request.body,
    addressId: Number(ctx.request.body.addressId),
  });
};
createPerson.validationScheme = {
  body: {
    firstName: Joi.string().required().max(255),
    lastName: Joi.string().required().max(255),
    phone: Joi.string().required().max(255),
    addressId: Joi.number().integer().positive().optional(),
  },
};

const updatePerson = async (ctx) => {
  ctx.body = await personService.updateById(ctx.params.id, {
    ...ctx.request.body,
    addressId: Number(ctx.request.body.addressId),
  });
};
updatePerson.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    firstName: Joi.string().required().max(255),
    lastName: Joi.string().required().max(255),
    phone: Joi.string().required().max(255),
    addressId: Joi.number().integer().positive().optional(),
  },
};

const deletePerson = async (ctx) => {
  await personService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deletePerson.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

/**
 * Install the routes for the people resource in the given router.
 *
 * @param {Router} app The router to install the routes in.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/people',
  });

  router.get('/', validate(getAllPeople.validationScheme), getAllPeople);
  router.get('/:id', validate(getPersonById.validationScheme), getPersonById);
  router.post('/', validate(createPerson.validationScheme), createPerson);
  router.put('/:id', validate(updatePerson.validationScheme), updatePerson);
  router.delete('/:id', validate(deletePerson.validationScheme), deletePerson);

  app.use(router.routes()).use(router.allowedMethods());
};
