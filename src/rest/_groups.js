const Router = require("@koa/router");
const groupService = require("../service/group");

const getAllGroups = async (ctx) => {
  ctx.body = groupService.getAll();
};

const getGroupById = async (ctx) => {
  ctx.body = groupService.getById(ctx.params.id);
};

const createGroup = async (ctx) => {
  ctx.body = groupService.create(ctx.request.body);
};

const updateGroupById = async (ctx) => {
  ctx.body = groupService.updateById(ctx.params.id, ctx.request.body);
};

const deleteGroupById = async (ctx) => {
  groupService.deleteById(ctx.params.id);
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
  router.put("/:id", updateGroupById);
  router.delete("/:id", deleteGroupById);

  app.use(router.routes()).use(router.allowedMethods());
};
