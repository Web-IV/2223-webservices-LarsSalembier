const Joi = require("joi");
const Router = require("@koa/router");
const leaderService = require("../service/leader");
const validate = require("./_validation");

const getAllLeaders = async (ctx) => {
  ctx.body = await leaderService.getAll();
};
getAllLeaders.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and("limit", "offset"),
};

const getLeaderById = async (ctx) => {
  ctx.body = await leaderService.getById(ctx.params.id);
};
getLeaderById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

const createLeader = async (ctx) => {
  ctx.body = await leaderService.create({
    personId: Number(ctx.request.body.personId),
    groupId: Number(ctx.request.body.groupId),
    yearId: Number(ctx.request.body.yearId),
  });
};
createLeader.validationScheme = {
  body: {
    personId: Joi.number().integer().positive().required(),
    groupId: Joi.number().integer().positive().required(),
    yearId: Joi.number().integer().positive().required(),
  },
};

const updateLeaderById = async (ctx) => {
  ctx.body = await leaderService.updateById(ctx.params.id, {
    personId: Number(ctx.request.body.personId),
    groupId: Number(ctx.request.body.groupId),
    yearId: Number(ctx.request.body.yearId),
  });
};
updateLeaderById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    personId: Joi.number().integer().positive().required(),
    groupId: Joi.number().integer().positive().required(),
    yearId: Joi.number().integer().positive().required(),
  },
};

const deleteLeaderById = async (ctx) => {
  await leaderService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteLeaderById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

/**
 * Install leader routes on the given router.
 *
 * @param {Router} app The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/leaders",
  });

  router.get("/", validate(getAllLeaders.validationScheme), getAllLeaders);
  router.get("/:id", validate(getLeaderById.validationScheme), getLeaderById);
  router.post("/", validate(createLeader.validationScheme), createLeader);
  router.put(
    "/:id",
    validate(updateLeaderById.validationScheme),
    updateLeaderById
  );
  router.delete(
    "/:id",
    validate(deleteLeaderById.validationScheme),
    deleteLeaderById
  );

  app.use(router.routes()).use(router.allowedMethods());
};
