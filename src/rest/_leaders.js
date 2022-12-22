const Router = require("@koa/router");
const leaderService = require("../service/leader");

const getAllLeaders = async (ctx) => {
  ctx.body = leaderService.getAll();
};

const getLeaderById = async (ctx) => {
  ctx.body = leaderService.getById(ctx.params.id);
};

const createLeader = async (ctx) => {
  ctx.body = leaderService.create({
    personId: Number(ctx.request.body.personId),
    groupId: Number(ctx.request.body.groupId),
    yearId: Number(ctx.request.body.yearId),
  });
};

const updateLeaderById = async (ctx) => {
  ctx.body = leaderService.updateById(ctx.params.id, {
    personId: Number(ctx.request.body.personId),
    groupId: Number(ctx.request.body.groupId),
    yearId: Number(ctx.request.body.yearId),
  });
};

const deleteLeaderById = async (ctx) => {
  leaderService.deleteById(ctx.params.id);
  ctx.status = 204;
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

  router.get("/", getAllLeaders);
  router.get("/:id", getLeaderById);
  router.post("/", createLeader);
  router.put("/:id", updateLeaderById);
  router.delete("/:id", deleteLeaderById);

  app.use(router.routes()).use(router.allowedMethods());
};
