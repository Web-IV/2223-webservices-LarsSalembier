const { getLogger } = require("../core/logging");
const personRepository = require("../repository/person");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all people
 *
 * @returns {Promise<{items: Array, count: number}>} list of people and total count
 */
const getAll = async () => {
  debugLog("Fetching all people");
  const items = await personRepository.findAll();
  const count = await personRepository.findCount();
  return { items, count };
};

/**
 * Get person by id
 *
 * @param {number} id the id of the person
 *
 * @returns {Promise<object>} the person
 */
const getById = async (id) => {
  debugLog(`Fetching person with id ${id}`);
  const person = await personRepository.findById(id);
  if (!person) {
    throw new Error(`Person with id ${id} not found`);
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
 * @returns {Promise<object>} the created person
 */
const create = async (person) => {
  debugLog("Creating new person", person);
  const id = await personRepository.create(person);
  return getById(id);
};

/**
 * Update a person by id
 * @param {number} id The id of the person to update
 * @param {object} person The person to update
 * @param {string} person.firstName The first name of the person
 * @param {string} person.lastName The last name of the person
 * @param {string} person.cellphone The cellphone of the person
 * @param {number} person.addressId The id of the address of the person
 * @returns {Promise<object>} the updated person
 */
const updateById = async (id, updatedPersonData) => {
  debugLog(`Updating person with id ${id}`, updatedPersonData);
  await personRepository.updateById(id, updatedPersonData);
  return getById(id);
};

/**
 * Delete a person by id
 *
 * @param {number} id The id of the person to delete
 */
const deleteById = async (id) => {
  debugLog(`Deleting person with id ${id}`);
  await personRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
