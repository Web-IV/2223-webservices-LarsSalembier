const { getLogger } = require("../core/logging");
let { ADDRESSES } = require("../data/mock-data");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = () => {
  debugLog("Fetching all addresses");
  return { items: ADDRESSES, count: ADDRESSES.length };
};

const getById = (id) => {
  debugLog(`Fetching address with id ${id}`);
  return ADDRESSES.find((address) => address.id === id);
};

const create = ({ street, number, city, zipCode }) => {
  if (!street || !number || !city || !zipCode) {
    throw new Error("Missing required fields");
  }
  const maxId = Math.max(...ADDRESSES.map((address) => address.id));
  const newAddress = {
    id: maxId + 1,
    street,
    number,
    city,
    zipCode,
  };
  debugLog(
    `Creating address with street ${street}, number ${number}, city ${city} and zipCode ${zipCode}`
  );
  ADDRESSES.push(newAddress);
  return newAddress;
};

const updateById = (id, { street, number, city, zipCode }) => {
  if (!street || !number || !city || !zipCode) {
    throw new Error("Missing required fields");
  }
  debugLog(
    `Updating address with id ${id} to street ${street}, number ${number}, city ${city} and zipCode ${zipCode}`
  );
  const address = getById(id);
  if (!address) {
    throw new Error(`Address with id ${id} not found`);
  }
  address.street = street;
  address.number = number;
  address.city = city;
  address.zipCode = zipCode;
  return address;
};

const deleteById = (id) => {
  debugLog(`Deleting address with id ${id}`);
  ADDRESSES = ADDRESSES.filter((address) => address.id !== id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
