const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logging");

/**
 * Find all addresses
 *
 * @returns {Promise<Array>} list of addresses
 */
const findAll = () => {
  return getKnex()(tables.address).select().orderBy("name", "ASC");
};

/**
 * Find address by id
 *
 * @param {number} id
 *
 * @returns {Promise<object>} the address
 */
const findById = (id) => {
  return getKnex()(tables.address).select().where("id", id).first();
};

/**
 * Calculate the total number of addresses
 *
 * @returns {Promise<number>} the total number of addresses
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.place).count();
  return count["count(*)"];
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
 * @returns {Promise<number>} id of the newly created address
 */
const create = async ({ street, number, city, zipCode }) => {
  try {
    const [id] = await getKnex()(tables.address).insert({
      street,
      number,
      city,
      zip_code: zipCode,
    });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error creating address", { error });
    throw error;
  }
};

/**
 * Update an address
 *
 * @param {number} id The id of the address to update
 * @param {object} address The address to update
 * @param {string} address.street The street of the address
 * @param {string} address.number The number of the address
 * @param {string} address.city The city of the address
 * @param {number} address.zipCode The zipCode of the address
 *
 * @returns {Promise<number>} id of the updated address
 */
const updateById = async (id, { street, number, city, zipCode }) => {
  try {
    await getKnex()(tables.address).where("id", id).update({
      street,
      number,
      city,
      zip_code: zipCode,
    });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error updating address", { error });
    throw error;
  }
};

/**
 * Delete an address
 *
 * @param {number} id
 *
 * @returns {Promise<boolean>} true if the address was deleted, false otherwise
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.address).where("id", id).del();
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error deleting address", { error });
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  findCount,
  create,
  updateById,
  deleteById,
};
