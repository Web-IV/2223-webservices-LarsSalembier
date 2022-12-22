const Router = require("@koa/router");
const headLeaderService = require("../service/headLeader");

const getAllHeadLeaders = async (ctx) => {
  ctx.body = headLeaderService.getAll();
};

const getHeadLeaderById = async (ctx) => {
  ctx.body = headLeaderService.getById(ctx.params.id);
};

const createHeadLeader = async (ctx) => {
  ctx.body = headLeaderService.create({
    personId: Number(ctx.request.body.personId),
    yearId: Number(ctx.request.body.yearId),
  });
};

const updateHeadLeaderById = async (ctx) => {
  ctx.body = headLeaderService.updateById(ctx.params.id, {
    personId: Number(ctx.request.body.personId),
    yearId: Number(ctx.request.body.yearId),
  });
};

const deleteHeadLeaderById = async (ctx) => {
  headLeaderService.deleteById(ctx.params.id);
  ctx.status = 204;
};

/**
 * Install head leader routes on the given router.
 *
 * @param {Router} app The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/headLeaders",
  });

  router.get("/", getAllHeadLeaders);
  router.get("/:id", getHeadLeaderById);
  router.post("/", createHeadLeader);
  router.put("/:id", updateHeadLeaderById);
  router.delete("/:id", deleteHeadLeaderById);

  app.use(router.routes()).use(router.allowedMethods());
};
