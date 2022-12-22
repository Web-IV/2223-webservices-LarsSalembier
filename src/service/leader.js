const { getLogger } = require('../core/logging');
let { LEADERS, GROUPS, PEOPLE, YEARS } = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}

const getAll = () => {
  debugLog('Fetching all leaders');
  return { items: LEADERS, count: LEADERS.length};
}

const getById = (id) => {
  debugLog(`Fetching leader with id ${id}`);
  return LEADERS.find(leader => leader.id === id);
}

const create = ({ personId, groupId, yearId }) => {
  if (!personId || !groupId || !yearId) {
    throw new Error('Missing required fields');
  }
  const existingPerson = PEOPLE.find(person => person.id === personId);
  if (!existingPerson) {
    throw new Error(`Person with id ${personId} not found`);
  }

  const existingGroup = GROUPS.find(group => group.id === groupId);
  if (!existingGroup) {
    throw new Error(`Group with id ${groupId} not found`);
  }

  const existingYear = YEARS.find(year => year.id === yearId);
  if (!existingYear) {
    throw new Error(`Year with id ${yearId} not found`);
  }

  const maxId = Math.max(...LEADERS.map(leader => leader.id));
  const newLeader = {
    id: maxId + 1,
    person: existingPerson,
    group: existingGroup,
    year: existingYear
  };
  debugLog(`Creating leader with personId ${personId} and groupId ${groupId}`);
  LEADERS.push(newLeader);
  return newLeader;
}

const updateById = (id, { personId, groupId, yearId }) => {
  if (!personId || !groupId || !yearId) {
    throw new Error('Missing required fields');
  }
  debugLog(`Updating leader with id ${id} to personId ${personId} and groupId ${groupId}`);
  const existingPerson = PEOPLE.find(person => person.id === personId);
  if (!existingPerson) {
    throw new Error(`Person with id ${personId} not found`);
  }

  const existingGroup = GROUPS.find(group => group.id === groupId);
  if (!existingGroup) {
    throw new Error(`Group with id ${groupId} not found`);
  }

  const existingYear = YEARS.find(year => year.id === yearId);
  if (!existingYear) {
    throw new Error(`Year with id ${yearId} not found`);
  }

  const leader = LEADERS.find(leader => leader.id === id);
  if (!leader) {
    throw new Error(`Leader with id ${id} not found`);
  }

  leader.person = existingPerson;
  leader.group = existingGroup;
  leader.year = existingYear;
  return leader;
}

const deleteById = (id) => {
  debugLog(`Deleting leader with id ${id}`);
  LEADERS = LEADERS.filter(leader => leader.id !== id);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
