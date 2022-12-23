const Joi = require('joi');
const Router = require('@koa/router');
const eventService = require('../service/event');
const validate = require('./_validation');

const getAllEvents = async (ctx) => {
  ctx.body = await eventService.getAll();
  ctx.status = 200;
};
getAllEvents.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
};

const getEventById = async (ctx) => {
  ctx.body = await eventService.getById(ctx.params.id);
  ctx.status = 200;
};
getEventById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

const createEvent = async (ctx) => {
  ctx.body = await eventService.create({
    ...ctx.request.body,
    addressId: Number(ctx.request.body.addressId),
    startDateTime: Date(ctx.request.body.startDateTime),
    endDateTime: ctx.request.body.endDateTime ?
      Date(ctx.request.body.endDateTime) :
      null,
    yearId: Number(ctx.request.body.yearId),
  });
  ctx.status = 201;
};
createEvent.validationScheme = {
  body: {
    name: Joi.string().max(255).required(),
    description: Joi.string().optional(),
    addressId: Joi.number().integer().positive().optional(),
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().optional(),
    targetAudience: Joi.string().optional(),
    yearId: Joi.number().integer().positive().required(),
  },
};

const updateEvent = async (ctx) => {
  ctx.body = await eventService.updateById(ctx.params.id, {
    ...ctx.request.body,
    addressId: Number(ctx.request.body.addressId),
    startDateTime: Date(ctx.request.body.startDateTime),
    endDateTime: ctx.request.body.endDateTime ?
      Date(ctx.request.body.endDateTime) :
      null,
    yearId: Number(ctx.request.body.yearId),
  });
  ctx.status = 200;
};
updateEvent.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    name: Joi.string().max(255).required(),
    description: Joi.string().optional(),
    addressId: Joi.number().integer().positive().optional(),
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().optional(),
    targetAudience: Joi.string().optional(),
    yearId: Joi.number().integer().positive().required(),
  },
};

const deleteEvent = async (ctx) => {
  await eventService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteEvent.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

/**
 * Install the routes for the events resource in the given router.
 *
 * @param {Router} app The router to install the routes in.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/events',
  });

  router.get('/', validate(getAllEvents.validationScheme), getAllEvents);
  router.get('/:id', validate(getEventById.validationScheme), getEventById);
  router.post('/', validate(createEvent.validationScheme), createEvent);
  router.put('/:id', validate(updateEvent.validationScheme), updateEvent);
  router.delete('/:id', validate(deleteEvent.validationScheme), deleteEvent);

  app.use(router.routes()).use(router.allowedMethods());
};
