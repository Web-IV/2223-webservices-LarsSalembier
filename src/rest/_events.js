const Router = require('@koa/router');
const eventService = require('../service/event');

const getAllEvents = async (ctx) => {
  ctx.body = eventService.getAll();
}

const getEventById = async (ctx) => {
  ctx.body = eventService.getById(ctx.params.id);
}

const createEvent = async (ctx) => {
  ctx.body = eventService.create({
    ...ctx.request.body,
    addressId: Number(ctx.request.body.addressId),
    startDateTime: Date(ctx.request.body.startDateTime),
    endDateTime: ctx.request.body.endDateTime ? Date(ctx.request.body.endDateTime) : null,
  });
}

const updateEvent = async (ctx) => {
  ctx.body = eventService.updateById(ctx.params.id, {
    ...ctx.request.body,
    addressId: Number(ctx.request.body.addressId),
    startDateTime: Date(ctx.request.body.startDateTime),
    endDateTime: ctx.request.body.endDateTime ? Date(ctx.request.body.endDateTime) : null,
  });
}

const deleteEvent = async (ctx) => {
  eventService.deleteById(ctx.params.id);
  ctx.status = 204;
}

/**
 * Install the routes for the events resource in the given router.
 * 
 * @param {Router} app The router to install the routes in.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/events'
  });

  router.get('/', getAllEvents);
  router.get('/:id', getEventById);
  router.post('/', createEvent);
  router.put('/:id', updateEvent);
  router.delete('/:id', deleteEvent);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}