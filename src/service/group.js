const {getLogger} = require('../core/logging');
const ServiceError = require('../core/ServiceError');
const groupRepository = require('../repository/group');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all groups
 *
 * @return {Promise<{items: Array, count: number}>} list of groups and total
 * count
 */
const getAll = async () => {
  debugLog('Fetching all groups');
  const items = await groupRepository.findAll();
  const count = await groupRepository.findCount();
  return {items, count};
};

/**
 * Get group by id
 *
 * @param {number} id the id of the group
 *
 * @return {Promise<object>} the group
 *
 * @throws {ServiceError.notFound} if the group is not found
 */
const getById = async (id) => {
  debugLog(`Fetching group with id ${id}`);
  const group = await groupRepository.findById(id);
  if (!group) {
    throw new ServiceError.NotFound(`Group with id ${id} not found`, {id});
  }
  return group;
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
 * @return {Promise<object>} the newly created group
 */
const create = async ({name, color, mascotName, targetAudience}) => {
  const newGroup = {name, color, mascotName, targetAudience};
  debugLog(`Creating new group with name ${name} and color ${color}`);
  const id = await groupRepository.create(newGroup);
  return getById(id);
};

/**
 * Update a group by id
 *
 * @param {number} id the id of the group
 * @param {object} group the group to update
 * @param {string} group.name the name of the group
 * @param {string} group.color the color of the group
 * @param {string} group.mascotName the mascot name of the group
 * @param {string} group.targetAudience the target audience of the group
 *
 * @return {Promise<object>} the updated group
 *
 * @throws {ServiceError.notFound} if the group is not found
 */
const updateById = async (id, {name, color, mascotName, targetAudience}) => {
  const updatedGroup = {name, color, mascotName, targetAudience};
  debugLog(`Updating group with id ${id} with name ${name} and color ${color}`);
  await groupRepository.updateById(id, updatedGroup);
  return getById(id);
};

/**
 * Delete a group by id
 *
 * @param {number} id the id of the group
 *
 * @throws {ServiceError.notFound} if the group is not found
 */
const deleteById = async (id) => {
  debugLog(`Deleting group with id ${id}`);
  const deleted = groupRepository.deleteById(id);
  if (!deleted) {
    throw new ServiceError.NotFound(`Group with id ${id} not found`, {id});
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
