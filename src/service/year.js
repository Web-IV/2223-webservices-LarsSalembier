const { getLogger } = require('../utils/logger');
const { YEARS, PEOPLE, LEADERS, EVENTS } = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}

const getAll = () => {
  debugLog('Fetching all years');
  return { items: YEARS, count: YEARS.length};
}

const getById = (id) => {
  debugLog(`Fetching year with id ${id}`);
  return YEARS.find(year => year.id === id);
}

const create = ({ startDate, endDate }) => {
  if (!startDate || !endDate) {
    throw new Error('Missing required fields');
  }

  const maxId = Math.max(...YEARS.map(year => year.id));
  const newYear = {
    id: maxId + 1,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  };
  debugLog(`Creating year with startDate ${startDate} and endDate ${endDate}`);
  YEARS.push(newYear);
  return newYear;
}

const updateById = (id, { startDate, endDate }) => {
  if (!startDate || !endDate) {
    throw new Error('Missing required fields');
  }
  debugLog(`Updating year with id ${id} to startDate ${startDate} and endDate ${endDate}`);
  const year = YEARS.find(year => year.id === id);
  if (!year) {
    throw new Error(`Year with id ${id} not found`);
  }
  year.startDate = new Date(startDate);
  year.endDate = new Date(endDate);
  return year;
}

const deleteById = (id) => {
  debugLog(`Deleting year with id ${id}`);
  YEARS = YEARS.filter(year => year.id !== id);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
