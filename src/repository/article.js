const {tables, getKnex} = require('../data/index');
const {getLogger} = require('../core/logging');

/**
 * Find all articles
 *
 * @return {Promise<Array>} list of articles
 */
const findAll = () => {
  return getKnex()(tables.article).select().orderBy('title', 'ASC');
};

/**
 * Find article by id
 *
 * @param {number} id the id of the article
 *
 * @return {Promise<object>} the article
 */
const findById = (id) => {
  return getKnex()(tables.article).select().where('id', id).first();
};

/**
 * Calculate the total number of articles
 *
 * @return {Promise<number>} the total number of articles
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.article).count();
  return count['count(*)'];
};

/**
 * Create a new article
 *
 * @param {object} article The article to create
 * @param {string} article.title The title of the article
 * @param {string} article.content The content of the article
 *
 * @return {Promise<number>} id of the newly created article
 */
const create = async ({title, content}) => {
  try {
    const [id] = await getKnex()(tables.article).insert({
      title,
      content,
    });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error creating article', {error});
    throw error;
  }
};

/**
 * Update an article by id
 *
 * @param {number} id the id of the article
 * @param {object} article the article to update
 * @param {string} article.title the title of the article
 * @param {string} article.content the content of the article
 *
 * @return {Promise<number>} the id of the updated article
 */
const updateById = async (id, {title, content}) => {
  try {
    await getKnex()(tables.article).update({title, content}).where('id', id);
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error updating article', {error});
    throw error;
  }
};

/**
 * Delete an article by id
 *
 * @param {number} id the id of the article
 *
 * @return {Promise<boolean>} true if the article was deleted, false otherwise
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.article)
        .delete()
        .where('id', id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error deleting article', {error});
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  findCount,
  create,
  updateById,
  deleteById,
};
