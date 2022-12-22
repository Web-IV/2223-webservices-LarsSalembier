const { getLogger } = require('../core/logging');

let PEOPLE = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    cellphone: '1234567890'
  }, {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    cellphone: '0987654321'
  }
];

const debugLog = (message, meta = {}) => {
  const logger = getLogger();
  logger.debug(message, meta);
}

const getAll = () => {
  debugLog('Fetching all people');
  return PEOPLE;
}

const getById = (id) => {
  debugLog(`Fetching person with id ${id}`);
  return PEOPLE.find(person => person.id === id);
}

const create = ({ firstName, lastName, cellphone }) => {
  const maxId = Math.max(...PEOPLE.map(person => person.id));
  const newPerson = { id: maxId + 1, firstName, lastName, cellphone };
  debugLog(`Creating person with firstName ${firstName}, lastName ${lastName}, cellphone ${cellphone}`);
  PEOPLE.push(newPerson);
  return newPerson;
}

const updateById = (id, { firstName, lastName, cellphone }) => {
  debugLog(`Updating person with id ${id} to firstName ${firstName}, lastName ${lastName}, cellphone ${cellphone}`);
  const person = getById(id);
  if (!person) {
    throw new Error(`Person with id ${id} not found`);
  }
  person.firstName = firstName;
  person.lastName = lastName;
  person.cellphone = cellphone;
  return person;
}

const deleteById = (id) => {
  debugLog(`Deleting person with id ${id}`);
  PEOPLE = PEOPLE.filter(person => person.id !== id);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
