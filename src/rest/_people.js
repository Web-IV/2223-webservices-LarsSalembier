const Router = require('@koa/router');
const personService = require('../service/person');

const getAllPeople = async (ctx) => {
  ctx.body = personService.getAll();
}

const getPersonById = async (ctx) => {
  ctx.body = personService.getById(ctx.params.id);
}

const createPerson = async (ctx) => {
  ctx.body = personService.create(ctx.request.body);
}

const updatePerson = async (ctx) => {
  ctx.body = personService.updateById(ctx.params.id, ctx.request.body);
}

const deletePerson = async (ctx) => {
  personService.deleteById(ctx.params.id);
  ctx.status = 204;
}

/**
 * Install the routes for the people resource in the given router.
 * 
 * @param {Router} app The router to install the routes in.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/people'
  });

  router.get('/', getAllPeople);
  router.get('/:id', getPersonById);
  router.post('/', createPerson);
  router.put('/:id', updatePerson);
  router.delete('/:id', deletePerson);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}
