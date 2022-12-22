const { logger } = require("../utils/logger");
const { ADULT_LEADERS, PEOPLE, YEARS } = require("../data/mock-data");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = logger;
  this.logger.debug(message, meta);
};

const getAll = () => {
  debugLog("Fetching all adult leaders");
  return { items: ADULT_LEADERS, count: ADULT_LEADERS.length };
};

const getById = (id) => {
  debugLog(`Fetching adult leader with id ${id}`);
  return ADULT_LEADERS.find((adultLeader) => adultLeader.id === id);
};

const create = ({ personId, yearId }) => {
  if (!personId || !yearId) {
    throw new Error("Missing required fields");
  }
  const existingPerson = PEOPLE.find((person) => person.id === personId);
  if (!existingPerson) {
    throw new Error(`Person with id ${personId} not found`);
  }

  const existingYear = YEARS.find((year) => year.id === yearId);
  if (!existingYear) {
    throw new Error(`Year with id ${yearId} not found`);
  }

  const maxId = Math.max(...ADULT_LEADERS.map((adultLeader) => adultLeader.id));
  const newAdultLeader = {
    id: maxId + 1,
    person: existingPerson,
    year: existingYear,
  };
  debugLog(
    `Creating adult leader with personId ${personId} and yearId ${yearId}`
  );
  ADULT_LEADERS.push(newAdultLeader);
  return newAdultLeader;
};

const updateById = (id, { personId, yearId }) => {
  if (!personId || !yearId) {
    throw new Error("Missing required fields");
  }
  debugLog(
    `Updating adult leader with id ${id} to personId ${personId} and yearId ${yearId}`
  );
  const existingPerson = PEOPLE.find((person) => person.id === personId);
  if (!existingPerson) {
    throw new Error(`Person with id ${personId} not found`);
  }

  const existingYear = YEARS.find((year) => year.id === yearId);
  if (!existingYear) {
    throw new Error(`Year with id ${yearId} not found`);
  }

  const adultLeader = ADULT_LEADERS.find(
    (adultLeader) => adultLeader.id === id
  );
  if (!adultLeader) {
    throw new Error(`Adult leader with id ${id} not found`);
  }
  adultLeader.person = existingPerson;
  adultLeader.year = existingYear;
  return adultLeader;
};

const deleteById = (id) => {
  debugLog(`Deleting adult leader with id ${id}`);
  ADULT_LEADERS = ADULT_LEADERS.filter((adultLeader) => adultLeader.id !== id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
