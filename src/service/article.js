const { getLogger } = require("../utils/logger");
const { ARTICLES } = require("../data/mock-data");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = () => {
  debugLog("Fetching all articles");
  return { items: ARTICLES, count: ARTICLES.length };
};

const getById = (id) => {
  debugLog(`Fetching article with id ${id}`);
  return ARTICLES.find((article) => article.id === id);
};

const create = ({ title, content }) => {
  if (!title || !content) {
    throw new Error("Missing required fields");
  }
  const maxId = Math.max(...ARTICLES.map((article) => article.id));
  const newArticle = {
    id: maxId + 1,
    title,
    content,
  };
  debugLog(`Creating article with title ${title} and content ${content}`);
  ARTICLES.push(newArticle);
  return newArticle;
};

const updateById = (id, { title, content }) => {
  debugLog(
    `Updating article with id ${id} to title ${title} and content ${content}`
  );
  if (!title || !content) {
    throw new Error("Missing required fields");
  }
  const article = getById(id);
  if (!article) {
    throw new Error(`Article with id ${id} not found`);
  }
  article.title = title;
  article.content = content;
  return article;
};

const deleteById = (id) => {
  debugLog(`Deleting article with id ${id}`);
  ARTICLES = ARTICLES.filter((article) => article.id !== id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
