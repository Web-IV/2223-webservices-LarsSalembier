const {getLogger} = require('../core/logging');
const ServiceError = require('../core/ServiceError');
const articleRepository = require('../repository/article');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all articles
 *
 * @return {Promise<{items: Array, count: number}>} list of articles and total
 * count
 */
const getAll = async () => {
  debugLog('Fetching all articles');
  const items = await articleRepository.findAll();
  const count = await articleRepository.findCount();
  return {items, count};
};

/**
 * Get article by id
 *
 * @param {number} id the id of the article
 *
 * @return {Promise<object>} the article
 *
 * @throws {ServiceError.notFound} if the article is not found
 */
const getById = async (id) => {
  debugLog(`Fetching article with id ${id}`);
  const article = await articleRepository.findById(id);
  if (!article) {
    throw new ServiceError.NotFound(`Article with id ${id} not found`, {id});
  }
  return article;
};

/**
 * Create a new article
 *
 * @param {object} article The article to create
 * @param {string} article.title The title of the article
 * @param {string} article.content The content of the article
 *
 * @return {Promise<object>} the newly created article
 */
const create = async ({title, content}) => {
  const newArticle = {title, content};
  debugLog(`Creating new article with title ${title} and content ${content}`);
  const id = await articleRepository.create(newArticle);
  return getById(id);
};

/**
 * Update an article by id
 *
 * @param {number} id the id of the article
 * @param {object} article the article to update
 * @param {string} article.title the title of the article
 * @param {string} article.content the content of the article
 *
 * @return {Promise<object>} the updated article
 *
 * @throws {ServiceError.notFound} if the article is not found
 */
const updateById = async (id, {title, content}) => {
  const updatedArticle = {title, content};
  debugLog(
      `Updating article with id ${id} with title ${title} and
      content ${content}`,
  );
  await articleRepository.updateById(id, updatedArticle);
  return getById(id);
};

/**
 * Delete an article by id
 *
 * @param {number} id the id of the article
 *
 * @throws {ServiceError.notFound} if the article is not found
 */
const deleteById = async (id) => {
  debugLog(`Deleting article with id ${id}`);
  const deleted = await articleRepository.deleteById(id);
  if (!deleted) {
    throw new ServiceError.NotFound(`Article with id ${id} not found`, {id});
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
