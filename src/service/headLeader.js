const { getLogger } = require('../utils/logger');
const { HEAD_LEADERS, YEARS, PEOPLE } = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}

const getAll = () => {
  debugLog('Fetching all head leaders');
  return { items: HEAD_LEADERS, count: HEAD_LEADERS.length};
}

const getById = (id) => {
  debugLog(`Fetching head leader with id ${id}`);
  return HEAD_LEADERS.find(headLeader => headLeader.id === id);
}

const create = ({ personId, yearId }) => {
  if (!personId || !yearId) {
    throw new Error('Missing required fields');
  }
  const existingPerson = PEOPLE.find(person => person.id === personId);
  if (!existingPerson) {
    throw new Error(`Person with id ${personId} not found`);
  }

  const existingYear = YEARS.find(year => year.id === yearId);
  if (!existingYear) {
    throw new Error(`Year with id ${yearId} not found`);
  }

  const maxId = Math.max(...HEAD_LEADERS.map(headLeader => headLeader.id));
  const newHeadLeader = {
    id: maxId + 1,
    person: existingPerson,
    year: existingYear
  };
  debugLog(`Creating head leader with personId ${personId} and yearId ${yearId}`);
  HEAD_LEADERS.push(newHeadLeader);
  return newHeadLeader;
}

const updateById = (id, { personId, yearId }) => {
  if (!personId || !yearId) {
    throw new Error('Missing required fields');
  }
  debugLog(`Updating head leader with id ${id} to personId ${personId} and yearId ${yearId}`);
  const existingPerson = PEOPLE.find(person => person.id === personId);
  if (!existingPerson) {
    throw new Error(`Person with id ${personId} not found`);
  }

  const existingYear = YEARS.find(year => year.id === yearId);
  if (!existingYear) {
    throw new Error(`Year with id ${yearId} not found`);
  }

  const headLeader = HEAD_LEADERS.find(headLeader => headLeader.id === id);
  if (!headLeader) {
    throw new Error(`Head leader with id ${id} not found`);
  }
  headLeader.person = existingPerson;
  headLeader.year = existingYear;
  return headLeader;
}

const deleteById = (id) => {
  debugLog(`Deleting head leader with id ${id}`);
  HEAD_LEADERS = HEAD_LEADERS.filter(headLeader => headLeader.id !== id);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};