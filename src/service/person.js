const { getLogger } = require('../core/logging');
let { PEOPLE, ADDRESSES } = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}

const getAll = () => {
  debugLog('Fetching all people');
  return { items: PEOPLE, count: PEOPLE.length};
}

const getById = (id) => {
  debugLog(`Fetching person with id ${id}`);
  return PEOPLE.find(person => person.id === id);
}

const create = ({ firstName, lastName, cellphone, addressId }) => {
  if (addressId) {
    const existingAddress = ADDRESSES.find(address => address.id === addressId);
    if (!existingAddress) {
      throw new Error(`Address with id ${addressId} not found`);
    }
  }

  const maxId = Math.max(...PEOPLE.map(person => person.id));
  const newPerson = {
    id: maxId + 1, firstName, lastName, cellphone,
    address: addressId ? ADDRESSES.find(address => address.id === addressId) : null
  };
  debugLog(`Creating person with firstName ${firstName}, lastName ${lastName}, cellphone ${cellphone} and addressId ${addressId}`);
  PEOPLE.push(newPerson);
  return newPerson;
}

const updateById = (id, { firstName, lastName, cellphone, placeId }) => {
  debugLog(`Updating person with id ${id} to firstName ${firstName}, lastName ${lastName}, cellphone ${cellphone} and addressId ${addressId}`);
  if (placeId) {
    const existingAddress = ADDRESSES.find(address => address.id === addressId);
    if (!existingAddress) {
      throw new Error(`Address with id ${addressId} not found`);
    }
  }
  
  const person = getById(id);
  if (!person) {
    throw new Error(`Person with id ${id} not found`);
  }
  person.firstName = firstName;
  person.lastName = lastName;
  person.cellphone = cellphone;
  person.address = addressId ? ADDRESSES.find(address => address.id === addressId) : null;
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
