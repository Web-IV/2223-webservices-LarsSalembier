const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logging");

/**
 * Find all years
 *
 * @returns {Promise<Array>} list of years
 */
const findAll = () => {
  return getKnex()(tables.year).select().orderBy("year", "ASC");
};

/**
 * Find year by id
 *
 * @param {number} id the id of the year
 */
const findById = (id) => {
  return getKnex()(tables.year).select().where("id", id).first();
};

/**
 * Calculate the total number of years
 *
 * @returns {Promise<number>} the total number of years
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.year).count();
  return count["count(*)"];
};

/**
 * Create a new year
 *
 * @param {object} year The year to create
 * @param {number} year.startDate The start date of the year
 * @param {number} year.endDate The end date of the year
 *
 * @returns {Promise<number>} id of the newly created year
 */
const create = async ({ startDate, endDate }) => {
  try {
    const [id] = await getKnex()(tables.year).insert({
      start_date: startDate,
      end_date: endDate,
    });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error creating year", { error });
    throw error;
  }
};

/**
 * Update a year by id
 *
 * @param {number} id the id of the year
 * @param {object} year The year to update
 * @param {number} year.startDate The start date of the year
 * @param {number} year.endDate The end date of the year
 *
 * @returns {Promise<number>} id of the updated year
 */
const updateById = async (id, { startDate, endDate }) => {
  try {
    await getKnex()(tables.year).where("id", id).update({
      start_date: startDate,
      end_date: endDate,
    });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error updating year", { error });
    throw error;
  }
};

/**
 * Delete a year by id
 *
 * @param {number} id the id of the year
 *
 * @returns {Promise<boolean>} true if the year was deleted
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.year).where("id", id).del();
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error deleting year", { error });
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