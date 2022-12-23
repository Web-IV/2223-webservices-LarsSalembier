const Router = require("@koa/router");
const groupService = require("../service/group");

const getAllGroups = async (ctx) => {
  ctx.body = await groupService.getAll();
};

const getGroupById = async (ctx) => {
  ctx.body = await groupService.getById(ctx.params.id);
};

const createGroup = async (ctx) => {
  ctx.body = await groupService.create(ctx.request.body);
};

const updateGroup = async (ctx) => {
  ctx.body = await groupService.updateById(ctx.params.id, ctx.request.body);
};

const deleteGroup = async (ctx) => {
  await groupService.deleteById(ctx.params.id);
  ctx.status = 204;
};

/**
 * Install group routes on the given router.
 *
 * @param {Router} app The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/groups",
  });

  router.get("/", getAllGroups);
  router.get("/:id", getGroupById);
  router.post("/", createGroup);
  router.put("/:id", updateGroup);
  router.delete("/:id", deleteGroup);

  app.use(router.routes()).use(router.allowedMethods());
};
