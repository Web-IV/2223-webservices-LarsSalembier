const { getLogger } = require('../utils/logger');
const { GROUPS } = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}

const getAll = () => {
  debugLog('Fetching all groups');
  return { items: GROUPS, count: GROUPS.length};
}

const getById = (id) => {
  debugLog(`Fetching group with id ${id}`);
  return GROUPS.find(group => group.id === id);
}

const create = ({ name, color, mascotName, targetAudience }) => {
  if (!name || !color || !targetAudience) {
    throw new Error('Missing required fields');
  }
  const maxId = Math.max(...GROUPS.map(group => group.id));
  const newGroup = {
    id: maxId + 1,
    name,
    color,
    mascotName,
    targetAudience
  };
  debugLog(`Creating group with name ${name} and color ${color}`);
  GROUPS.push(newGroup);
  return newGroup;
}

const updateById = (id, { name, color, mascotName, targetAudience }) => {
  debugLog(`Updating group with id ${id} to name ${name} and color ${color}`);
  if(!name || !color) {
    throw new Error('Missing required fields');
  }
  const group = getById(id);
  if (!group) {
    throw new Error(`Group with id ${id} not found`);
  }
  group.name = name;
  group.color = color;
  group.mascotName = mascotName;
  group.targetAudience = targetAudience;
  return group;
}

const deleteById = (id) => {
  debugLog(`Deleting group with id ${id}`);
  GROUPS = GROUPS.filter(group => group.id !== id);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
