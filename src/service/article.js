const { getLogger } = require("../core/logging");
const articleRepository = require("../repository/article");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all articles
 *
 * @returns {Promise<{items: Array, count: number}>} list of articles and total count
 */
const getAll = async () => {
  debugLog("Fetching all articles");
  const items = await articleRepository.findAll();
  const count = await articleRepository.findCount();
  return { items, count };
};

/**
 * Get article by id
 *
 * @param {number} id the id of the article
 *
 * @returns {Promise<object>} the article
 */
const getById = (id) => {
  debugLog(`Fetching article with id ${id}`);
  return articleRepository.findById(id);
};

/**
 * Create a new article
 *
 * @param {object} article The article to create
 * @param {string} article.title The title of the article
 * @param {string} article.content The content of the article
 *
 * @returns {Promise<object>} the newly created article
 */
const create = async ({ title, content }) => {
  const newArticle = { title, content };
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
 * @returns {Promise<object>} the updated article
 */
const updateById = async (id, { title, content }) => {
  const updatedArticle = { title, content };
  debugLog(
    `Updating article with id ${id} with title ${title} and content ${content}`
  );
  await articleRepository.updateById(id, updatedArticle);
  return getById(id);
};

/**
 * Delete an article by id
 *
 * @param {number} id the id of the article
 */
const deleteById = async (id) => {
  debugLog(`Deleting article with id ${id}`);
  await articleRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
