const {tables, getKnex} = require('../data/index');
const {getLogger} = require('../core/logging');

/**
 * Find all groups
 *
 * @return {Promise<Array>} list of groups
 */
const findAll = () => {
  return getKnex()(tables.group).select().orderBy('title', 'ASC');
};

/**
 * Find group by id
 *
 * @param {number} id the id of the group
 *
 * @return {Promise<object>} the group
 */
const findById = (id) => {
  return getKnex()(tables.group).select().where('id', id).first();
};

/**
 * Calculate the total number of groups
 *
 * @return {Promise<number>} the total number of groups
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.group).count();
  return count['count(*)'];
};

/**
 * Create a new group
 *
 * @param {object} group The group to create
 * @param {string} group.name The name of the group
 * @param {string} group.color The color of the group
 * @param {string} group.mascotName The mascot name of the group
 * @param {string} group.targetAudience The target audience of the group
 *
 * @return {Promise<number>} id of the newly created group
 */
const create = async ({name, color, mascotName, targetAudience}) => {
  try {
    const [id] = await getKnex()(tables.group).insert({
      name,
      color,
      mascotName,
      targetAudience,
    });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error creating group', {error});
    throw error;
  }
};

/**
 * Update a group by id
 *
 * @param {number} id the id of the group
 * @param {object} group The group to update
 * @param {string} group.name The name of the group
 * @param {string} group.color The color of the group
 * @param {string} group.mascotName The mascot name of the group
 * @param {string} group.targetAudience The target audience of the group
 *
 * @return {Promise<number>} id of the updated group
 */
const updateById = async (id, {name, color, mascotName, targetAudience}) => {
  try {
    const [id] = await getKnex()(tables.group)
        .update({
          name,
          color,
          mascotName,
          targetAudience,
        })
        .where('id', id);
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error updating group', {error});
    throw error;
  }
};

/**
 * Delete a group by id
 *
 * @param {number} id the id of the group
 *
 * @return {Promise<boolean>} true if the group was deleted
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.group).delete().where('id', id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error deleting group', {error});
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
