const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logging");

const SELECT_COLUMNS = [
  `${tables.person}.id`,
  "first_name",
  "last_name",
  "cellphone",
  `${tables.address}.id as address_id`,
  `${tables.address}.street as address_street`,
  `${tables.address}.number as address_number`,
  `${tables.address}.city as address_city`,
  `${tables.address}.zip as address_zip`,
];

const formatPerson = ({
  address_id,
  address_street,
  address_number,
  address_city,
  address_zip,
  ...rest
}) => ({
  ...rest,
  address: {
    id: address_id,
    street: address_street,
    number: address_number,
    city: address_city,
    zip: address_zip,
  },
});

/**
 * Get all persons
 *
 * @returns {Promise<Array>} list of persons
 */
const findAll = async () => {
  const persons = await getKnex()(tables.person)
    .select(SELECT_COLUMNS)
    .join(
      tables.address,
      `${tables.address}.id`,
      "=",
      `${tables.person}.address_id`
    )
    .orderBy("last_name", "ASC");
  return persons.map(formatPerson);
};

/**
 * Calculate the total number of persons
 */
const count = async () => {
  const [count] = await getKnex()(tables.person).count();
  return count["count(*)"];
};

/**
 * Get a person by id
 *
 * @param {number} id
 */
const findById = async (id) => {
  const [person] = await getKnex()(tables.person)
    .select(SELECT_COLUMNS)
    .join(
      tables.address,
      `${tables.address}.id`,
      "=",
      `${tables.person}.address_id`
    )
    .where(`${tables.person}.id`, id);
  return person && formatPerson(person);
};

/**
 * Create a new person
 *
 * @param {object} person
 * @param {string} person.firstName
 * @param {string} person.lastName
 * @param {string} person.cellphone
 * @param {number} person.addressId
 *
 * @returns {Promise<number>} The id of the created person
 */
const create = async ({ firstName, lastName, cellphone, addressId }) => {
  try {
    const [id] = await getKnex()(tables.person).insert({
      first_name: firstName,
      last_name: lastName,
      cellphone,
      address_id: addressId,
    });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error creating person", { error });
    throw error;
  }
};

/**
 * Update a person by id
 *
 * @param {number} id
 * @param {object} person
 * @param {string} person.firstName
 * @param {string} person.lastName
 * @param {string} person.cellphone
 * @param {number} person.addressId
 *
 * @returns {Promise<number>} The id of the updated person
 */
const updateById = async (
  id,
  { firstName, lastName, cellphone, addressId }
) => {
  try {
    await getKnex()(tables.person).where("id", id).update({
      first_name: firstName,
      last_name: lastName,
      cellphone,
      address_id: addressId,
    });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error updating person", { error });
    throw error;
  }
};

/**
 * Delete a person by id
 *
 * @param {number} id
 *
 * @returns {Promise<boolean>} true if the person was deleted, false otherwise
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.person).where("id", id).del();
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error deleting person", { error });
    throw error;
  }
};

module.exports = {
  findAll,
  count,
  findById,
  create,
  updateById,
  deleteById,
};
