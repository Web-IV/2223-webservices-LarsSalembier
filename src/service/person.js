const {getLogger} = require('../core/logging');
const ServiceError = require('../core/ServiceError');
const personRepository = require('../repository/person');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all people
 *
 * @return {Promise<{items: Array, count: number}>} list of people and total
 * count
 */
const getAll = async () => {
  debugLog('Fetching all people');
  const items = await personRepository.findAll();
  const count = await personRepository.findCount();
  return {items, count};
};

/**
 * Get person by id
 *
 * @param {number} id the id of the person
 *
 * @return {Promise<object>} the person
 *
 * @throws {ServiceError.notFound} if the person is not found
 */
const getById = async (id) => {
  debugLog(`Fetching person with id ${id}`);
  const person = await personRepository.findById(id);
  if (!person) {
    throw ServiceError.notFound(`Person with id ${id} not found`, {id});
  }
  return person;
};

/**
 * Create a new person
 * @param {object} person The person to create
 * @param {string} person.firstName The first name of the person
 * @param {string} person.lastName The last name of the person
 * @param {string} person.cellphone The cellphone of the person
 * @param {number} person.addressId The id of the address of the person
 *
 * @return {Promise<object>} the created person
 */
const create = async (person) => {
  debugLog('Creating new person', person);
  const id = await personRepository.create(person);
  return getById(id);
};

/**
 * Update a person by id
 * @param {number} id The id of the person to update
 * @param {object} updatedPerson The person to update
 * @param {string} updatedPerson.firstName The first name of the person
 * @param {string} updatedPerson.lastName The last name of the person
 * @param {string} updatedPerson.cellphone The cellphone of the person
 * @param {number} updatedPerson.addressId The id of the address of the person
 *
 * @return {Promise<object>} the updated person
 *
 * @throws {ServiceError.notFound} if the person is not found
 */
const updateById = async (id, updatedPerson) => {
  debugLog(`Updating person with id ${id}`, updatedPersonData);
  await personRepository.updateById(id, updatedPersonData);
  return getById(id);
};

/**
 * Delete a person by id
 *
 * @param {number} id The id of the person to delete
 *
 * @throws {ServiceError.notFound} if the person is not found
 */
const deleteById = async (id) => {
  debugLog(`Deleting person with id ${id}`);
  const deleted = await personRepository.deleteById(id);
  if (!deleted) {
    throw ServiceError.notFound(`Person with id ${id} not found`, {id});
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
