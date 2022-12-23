const { getLogger } = require("../core/logging");
const ServiceError = require("../core/ServiceError");
const addressRepository = require("../repository/address");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all addresses
 *
 * @returns {Promise<{items: Array, count: number}>} list of addresses and total count
 */
const getAll = async () => {
  debugLog("Fetching all addresses");
  const items = await addressRepository.findAll();
  const count = await addressRepository.findCount();
  return { items, count };
};

/**
 * Get address by id
 *
 * @param {number} id The id of the address to fetch
 *
 * @returns {Promise<object>} the address
 *
 * @throws {ServiceError.notFound} if the address is not found
 */
const getById = async (id) => {
  debugLog(`Fetching address with id ${id}`);
  const address = await addressRepository.findById(id);
  if (!address) {
    throw new ServiceError.notFound(`Address with id ${id} not found`, { id });
  }
};

/**
 * Create a new address
 *
 * @param {object} address The address to create
 * @param {string} address.street The street of the address
 * @param {string} address.number The number of the address
 * @param {string} address.city The city of the address
 * @param {number} address.zipCode The zipCode of the address
 *
 * @returns {Promise<object>} the newly created address
 */
const create = async ({ street, number, city, zipCode }) => {
  const newPlace = {
    street,
    number,
    city,
    zipCode,
  };
  debugLog("Created new address", newPlace);
  const id = await addressRepository.create(newPlace);
  return getById(id);
};

/**
 * Update an address
 * @param {number} id The id of the address to update
 * @param {object} address The address to update
 * @param {string} address.street The street of the address
 * @param {string} address.number The number of the address
 * @param {string} address.city The city of the address
 * @param {number} address.zipCode The zipCode of the address
 *
 * @returns {Promise<object>} the updated address
 *
 * @throws {ServiceError.notFound} if the address is not found
 */
const updateById = async (id, { street, number, city, zipCode }) => {
  const updatedAddress = {
    street,
    number,
    city,
    zipCode,
  };

  debugLog(`Updated address with id ${id}`, updatedAddress);
  await addressRepository.updateById(id, updatedAddress);
  return getById(id);
};

/**
 * Delete an address
 *
 * @param {number} id The id of the address to delete
 *
 * @throws {ServiceError.notFound} if the address is not found
 */
const deleteById = async (id) => {
  debugLog(`Deleting address with id ${id}`);
  const deleted = await addressRepository.deleteById(id);
  if (!deleted) {
    throw new ServiceError.notFound(`Address with id ${id} not found`, { id });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
