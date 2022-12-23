const Router = require("@koa/router");
const addressService = require("../service/address");
const validate = require("./_validation");

const getAllAddresses = async (ctx) => {
  ctx.body = await addressService.getAll();
};
getAllAddresses.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and("limit", "offset"),
};

const getAddressById = async (ctx) => {
  ctx.body = await addressService.getById(ctx.params.id);
};
getAddressById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

const createAddress = async (ctx) => {
  ctx.body = await addressService.create({
    ...ctx.request.body,
    zipCode: Number(ctx.request.body.zipCode),
  });
};
createAddress.validationScheme = {
  body: {
    street: Joi.string().required(),
    number: Joi.string().required(),
    city: Joi.string().required(),
    zipCode: Joi.number().integer().positive().required(),
  },
};

const updateAddress = async (ctx) => {
  ctx.body = await addressService.updateById(ctx.params.id, {
    ...ctx.request.body,
    zipCode: Number(ctx.request.body.zipCode),
  });
};
updateAddress.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    street: Joi.string().required(),
    number: Joi.string().required(),
    city: Joi.string().required(),
    zipCode: Joi.number().integer().positive().required(),
  },
};

const deleteAddress = async (ctx) => {
  await addressService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteAddress.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
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

  router.get("/", validate(getAllAddresses.validationScheme), getAllAddresses);
  router.get("/:id", validate(getAddressById.validationScheme), getAddressById);
  router.post("/", validate(createAddress.validationScheme), createAddress);
  router.put("/:id", validate(updateAddress.validationScheme), updateAddress);
  router.delete(
    "/:id",
    validate(deleteAddress.validationScheme),
    deleteAddress
  );

  app.use(router.routes()).use(router.allowedMethods());
};
