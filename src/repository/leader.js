const { tables, getKnex } = require("../data/index");
const { getLogger } = require("../core/logging");

const SELECT_COLUMNS = [
  `${tables.leader}.id`,
  `${tables.person}.id as person_id`,
  `${tables.person}.first_name as person_first_name`,
  `${tables.person}.last_name as person_last_name`,
  `${tables.person}.cellphone as person_cellphone`,
  `${tables.group}.id as group_id`,
  `${tables.group}.name as group_name`,
  `${tables.group}.color as group_color`,
  `${tables.group}.mascot_name as group_mascot_name`,
  `${tables.group}.target_audience as group_target_audience`,
  `${tables.year}.id as year_id`,
  `${tables.year}.start_date as year_start_date`,
  `${tables.year}.end_date as year_end_date`,
];

const formatLeader = ({
  person_id,
  person_first_name,
  person_last_name,
  person_cellphone,
  group_id,
  group_name,
  group_color,
  group_mascot_name,
  group_target_audience,
  year_id,
  year_start_date,
  year_end_date,
  ...rest
}) => ({
  ...rest,
  person: {
    id: person_id,
    first_name: person_first_name,
    last_name: person_last_name,
    cellphone: person_cellphone,
  },
  group: {
    id: group_id,
    name: group_name,
    color: group_color,
    mascot_name: group_mascot_name,
    target_audience: group_target_audience,
  },
  year: {
    id: year_id,
    start_date: year_start_date,
    end_date: year_end_date,
  },
});

/**
 * Get all leaders
 */
const findAll = async () => {
  const leaders = await getKnex()(tables.leader)
    .select(SELECT_COLUMNS)
    .join(
      tables.person,
      `${tables.person}.id`,
      "=",
      `${tables.leader}.person_id`
    )
    .join(tables.group, `${tables.group}.id`, "=", `${tables.leader}.group_id`)
    .join(tables.year, `${tables.year}.id`, "=", `${tables.leader}.year_id`)
    .orderBy(`${tables.person}.last_name`, "asc");

  return leaders.map(formatLeader);
};

/**
 * Calculate the number of leaders
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.leader).count();

  return count["count(*)"];
};

/**
 * Get a leader by id
 *
 * @param {number} id
 */
const findById = async (id) => {
  const [leader] = await getKnex()(tables.leader)
    .select(SELECT_COLUMNS)
    .join(
      tables.person,
      `${tables.person}.id`,
      "=",
      `${tables.leader}.person_id`
    )
    .join(tables.group, `${tables.group}.id`, "=", `${tables.leader}.group_id`)
    .join(tables.year, `${tables.year}.id`, "=", `${tables.leader}.year_id`)
    .where(`${tables.leader}.id`, id);

  return leader && formatLeader(leader);
};

/**
 * Create a new transaction
 *
 * @param {object} leader
 * @param {number} leader.personId
 * @param {number} leader.groupId
 * @param {number} leader.yearId
 *
 * @returns {Promise<number>} The id of the created leader
 */
const create = async ({ personId, groupId, yearId }) => {
  try {
    const [id] = await getKnex()(tables.leader).insert({
      person_id: personId,
      group_id: groupId,
      year_id: yearId,
    });
  } catch (error) {
    getLogger().error("Failed to create leader", { error });
    throw error;
  }
};

/**
 * Update a leader
 *
 * @param {number} id
 * @param {object} leader
 * @param {number} leader.personId
 * @param {number} leader.groupId
 * @param {number} leader.yearId
 *
 * @returns {Promise<number>} The id of the updated leader
 */
const updateById = async (id, { personId, groupId, yearId }) => {
  try {
    await getKnex()(tables.leader).where(`${tables.leader}.id`, id).update({
      person_id: personId,
      group_id: groupId,
      year_id: yearId,
    });
  } catch (error) {
    getLogger().error("Failed to update leader", { error });
    throw error;
  }
};

/**
 * Delete a leader
 *
 * @param {number} id
 *
 * @returns {Promise<boolean>} True if the leader was deleted
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.leader).where({ id }).del();
    return rowsAffected > 0;
  } catch (error) {
    getLogger().error("Failed to delete leader", { error });
    throw error;
  }
};

module.exports = {
  findAll,
  findCount,
  findById,
  create,
  updateById,
  deleteById,
};
