const Router = require("@koa/router");
const adultLeaderService = require("../service/adultLeader");

const getAllAdultLeaders = async (ctx) => {
  ctx.body = adultLeaderService.getAll();
};

const getAdultLeaderById = async (ctx) => {
  ctx.body = adultLeaderService.getById(ctx.params.id);
};

const createAdultLeader = async (ctx) => {
  ctx.body = adultLeaderService.create({
    personId: Number(ctx.request.body.personId),
    yearId: Number(ctx.request.body.yearId),
  });
};

const updateAdultLeaderById = async (ctx) => {
  ctx.body = adultLeaderService.updateById(ctx.params.id, {
    personId: Number(ctx.request.body.personId),
    yearId: Number(ctx.request.body.yearId),
  });
};

const deleteAdultLeaderById = async (ctx) => {
  adultLeaderService.deleteById(ctx.params.id);
  ctx.status = 204;
};

/**
 * Install adult leader routes on the given router.
 *
 * @param {Router} app The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/adultLeaders",
  });

  router.get("/", getAllAdultLeaders);
  router.get("/:id", getAdultLeaderById);
  router.post("/", createAdultLeader);
  router.put("/:id", updateAdultLeaderById);
  router.delete("/:id", deleteAdultLeaderById);

  app.use(router.routes()).use(router.allowedMethods());
};
