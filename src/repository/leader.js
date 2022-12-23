const {tables, getKnex} = require('../data/index');
const {getLogger} = require('../core/logging');

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
  `${tables.address}.id as address_id`,
  `${tables.address}.street as address_street`,
  `${tables.address}.number as address_number`,
  `${tables.address}.city as address_city`,
  `${tables.address}.zip as address_zip`,
];

const formatLeader = ({
  person_id: personId,
  person_first_name: personFirstName,
  person_last_name: personLastName,
  person_cellphone: personCellphone,
  group_id: groupId,
  group_name: groupName,
  group_color: groupColor,
  group_mascot_name: groupMascotName,
  group_target_audience: groupTargetName,
  year_id: yearId,
  year_start_date: yearStartDate,
  year_end_date: yearEndDate,
  address_id: addressId,
  address_street: addressStreet,
  address_number: addressNumber,
  address_city: addressCity,
  address_zip: addressZip,
  ...rest
}) => ({
  ...rest,
  person: {
    id: personId,
    first_name: personFirstName,
    last_name: personLastName,
    cellphone: personCellphone,
    address: {
      id: addressId,
      street: addressStreet,
      number: addressNumber,
      city: addressCity,
      zip: addressZip,
    },
  },
  group: {
    id: groupId,
    name: groupName,
    color: groupColor,
    mascot_name: groupMascotName,
    target_audience: groupTargetName,
  },
  year: {
    id: yearId,
    start_date: yearStartDate,
    end_date: yearEndDate,
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
          '=',
          `${tables.leader}.person_id`,
      )
      .join(tables.group, `${tables.group}.id`, '=',
          `${tables.leader}.group_id`)
      .join(tables.year, `${tables.year}.id`, '=', `${tables.leader}.year_id`)
      .join(tables.address, `${tables.address}.id`, '=',
          `${tables.person}.address_id`)
      .orderBy(`${tables.person}.last_name`, 'asc');

  return leaders.map(formatLeader);
};

/**
 * Calculate the number of leaders
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.leader).count();

  return count['count(*)'];
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
          '=',
          `${tables.leader}.person_id`,
      )
      .join(tables.group, `${tables.group}.id`, '=',
          `${tables.leader}.group_id`)
      .join(tables.year, `${tables.year}.id`, '=', `${tables.leader}.year_id`)
      .join(tables.address, `${tables.address}.id`, '=',
          `${tables.person}.address_id`)
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
 * @return {Promise<number>} The id of the created leader
 */
const create = async ({personId, groupId, yearId}) => {
  try {
    const [id] = await getKnex()(tables.leader).insert({
      person_id: personId,
      group_id: groupId,
      year_id: yearId,
    });

    return id;
  } catch (error) {
    getLogger().error('Failed to create leader', {error});
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
 * @return {Promise<number>} The id of the updated leader
 */
const updateById = async (id, {personId, groupId, yearId}) => {
  try {
    await getKnex()(tables.leader).where(`${tables.leader}.id`, id).update({
      person_id: personId,
      group_id: groupId,
      year_id: yearId,
    });
  } catch (error) {
    getLogger().error('Failed to update leader', {error});
    throw error;
  }
};

/**
 * Delete a leader
 *
 * @param {number} id
 *
 * @return {Promise<boolean>} True if the leader was deleted
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.leader).where({id}).del();
    return rowsAffected > 0;
  } catch (error) {
    getLogger().error('Failed to delete leader', {error});
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
