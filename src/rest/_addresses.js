const Router = require("@koa/router");
const addressService = require("../service/address");

const getAllAddresses = async (ctx) => {
  ctx.body = await addressService.getAll();
};

const getAddressById = async (ctx) => {
  ctx.body = await addressService.getById(ctx.params.id);
};

const createAddress = async (ctx) => {
  ctx.body = await addressService.create({
    ...ctx.request.body,
    zipCode: Number(ctx.request.body.zipCode),
  });
};

const updateAddressById = async (ctx) => {
  ctx.body = await addressService.updateById(ctx.params.id, {
    ...ctx.request.body,
    zipCode: Number(ctx.request.body.zipCode),
  });
};

const deleteAddressById = async (ctx) => {
  await addressService.deleteById(ctx.params.id);
  ctx.status = 204;
};

/**
 * Install address routes on the given router.
 *
 * @param {Router} app The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/addresses",
  });

  router.get("/", getAllAddresses);
  router.get("/:id", getAddressById);
  router.post("/", createAddress);
  router.put("/:id", updateAddressById);
  router.delete("/:id", deleteAddressById);

  app.use(router.routes()).use(router.allowedMethods());
};
