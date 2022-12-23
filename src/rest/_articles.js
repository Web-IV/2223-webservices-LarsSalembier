const Joi = require("joi");
const Router = require("@koa/router");
const articleService = require("../service/article");
const validate = require("./_validation");

const getAllArticles = async (ctx) => {
  ctx.body = await articleService.getAll();
};
getAllArticles.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and("limit", "offset"),
};

const getArticleById = async (ctx) => {
  ctx.body = await articleService.getById(ctx.params.id);
};
getArticleById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

const createArticle = async (ctx) => {
  ctx.body = await articleService.create(ctx.request.body);
};
createArticle.validationScheme = {
  body: {
    title: Joi.string().required().max(255),
    content: Joi.string().required(),
  },
};

const updateArticle = async (ctx) => {
  ctx.body = await articleService.updateById(ctx.params.id, ctx.request.body);
};
updateArticle.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    title: Joi.string().required().max(255),
    content: Joi.string().required(),
  },
};

const deleteArticle = async (ctx) => {
  await articleService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteArticle.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

/**
 * Install article routes on the given router.
 *
 * @param {Router} app The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/articles",
  });

  router.get("/", validate(getAllArticles.validationScheme), getAllArticles);
  router.get("/:id", validate(getArticleById.validationScheme), getArticleById);
  router.post("/", validate(createArticle.validationScheme), createArticle);
  router.put("/:id", validate(updateArticle.validationScheme), updateArticle);
  router.delete(
    "/:id",
    validate(deleteArticle.validationScheme),
    deleteArticle
  );

  app.use(router.routes()).use(router.allowedMethods());
};
