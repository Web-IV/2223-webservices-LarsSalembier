const Router = require('@koa/router');
const articleService = require('../service/article');

const getAllArticles = async (ctx) => {
  ctx.body = articleService.getAll();
}

const getArticleById = async (ctx) => {
  ctx.body = articleService.getById(ctx.params.id);
}

const createArticle = async (ctx) => {
  ctx.body = articleService.create(ctx.request.body);
}

const updateArticleById = async (ctx) => {
  ctx.body = articleService.updateById(ctx.params.id, ctx.request.body);
}

const deleteArticleById = async (ctx) => {
  articleService.deleteById(ctx.params.id);
  ctx.status = 204;
}

/**
 * Install article routes on the given router.
 * 
 * @param {Router} app The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/articles'
  });

  router.get('/', getAllArticles);
  router.get('/:id', getArticleById);
  router.post('/', createArticle);
  router.put('/:id', updateArticleById);
  router.delete('/:id', deleteArticleById);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}
