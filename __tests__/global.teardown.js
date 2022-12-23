const {shutdownData, getKnex, tables} = require('../src/data');

module.exports = async () => {
  // Remove any leftover data
  await getKnex()(tables.leader).delete();
  await getKnex()(tables.person).delete();
  await getKnex()(tables.address).delete();
  await getKnex()(tables.group).delete();

  // Close database connection
  await shutdownData();
};
