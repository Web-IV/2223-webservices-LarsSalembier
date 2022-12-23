const Router = require("@koa/router");
const personService = require("../service/person");

const getAllPeople = async (ctx) => {
  ctx.body = await personService.getAll();
};

const getPersonById = async (ctx) => {
  ctx.body = await personService.getById(ctx.params.id);
};

const createPerson = async (ctx) => {
  ctx.body = await personService.create({
    ...ctx.request.body,
    addressId: Number(ctx.request.body.addressId),
  });
};

const updatePerson = async (ctx) => {
  ctx.body = await personService.updateById(ctx.params.id, {
    ...ctx.request.body,
    addressId: Number(ctx.request.body.addressId),
  });
};

const deletePerson = async (ctx) => {
  await personService.deleteById(ctx.params.id);
  ctx.status = 204;
};

/**
 * Install the routes for the people resource in the given router.
 *
 * @param {Router} app The router to install the routes in.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/people",
  });

  router.get("/", getAllPeople);
  router.get("/:id", getPersonById);
  router.post("/", createPerson);
  router.put("/:id", updatePerson);
  router.delete("/:id", deletePerson);

  app.use(router.routes()).use(router.allowedMethods());
};
