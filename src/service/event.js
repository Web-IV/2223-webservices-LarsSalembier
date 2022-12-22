const { getLogger } = require('../utils/logger');
const { EVENTS, ADDRESSES } = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}

const getAll = () => {
  debugLog('Fetching all events');
  return { items: EVENTS, count: EVENTS.length};
}

const getById = (id) => {
  debugLog(`Fetching event with id ${id}`);
  return EVENTS.find(event => event.id === id);
}

const create = ({ name, description, addressId, startDateTime, endDateTime, targetAudience }) => {
  if (!name || !startDateTime) {
    throw new Error('Missing required fields');
  }
  const existingAddress = ADDRESSES.find(address => address.id === addressId);
  if (!existingAddress) {
    throw new Error(`Address with id ${addressId} not found`);
  }
  const maxId = Math.max(...EVENTS.map(event => event.id));
  const newEvent = {
    id: maxId + 1,
    name,
    description,
    address: existingAddress,
    startDateTime: new Date(startDateTime),
    endDateTime: endDateTime ? new Date(endDateTime) : null,
    targetAudience
  };
  debugLog(`Creating event with name ${name} and description ${description}`);
  EVENTS.push(newEvent);
  return newEvent;
}

const updateById = (id, { name, description, addressId, startDateTime, endDateTime, targetAudience }) => {
  if (!name || !startDateTime) {
    throw new Error('Missing required fields');
  }
  debugLog(`Updating event with id ${id} to name ${name} and description ${description}`);
  if (addressId) {
    const existingAddress = ADDRESSES.find(address => address.id === addressId);
    if (!existingAddress) {
      throw new Error(`Address with id ${addressId} not found`);
    }
  }
  
  const event = getById(id);
  if (!event) {
    throw new Error(`Event with id ${id} not found`);
  }
  event.name = name;
  event.description = description;
  event.address = addressId ? ADDRESSES.find(address => address.id === addressId) : null;
  event.startDateTime = new Date(startDateTime);
  event.endDateTime = endDateTime ? new Date(endDateTime) : null;
  event.targetAudience = targetAudience;
  return event;
}

const deleteById = (id) => {
  debugLog(`Deleting event with id ${id}`);
  EVENTS = EVENTS.filter(event => event.id !== id);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};