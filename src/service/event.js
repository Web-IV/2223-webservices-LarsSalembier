const {getLogger} = require('../core/logging');
const ServiceError = require('../core/ServiceError');
const eventRepository = require('../repository/event');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all events
 *
 * @return {Promise<{items: Array, count: number}>} list of events and total
 * count
 */
const getAll = async () => {
  debugLog('Fetching all events');
  const items = await eventRepository.findAll();
  const count = await eventRepository.findCount();
  return {items, count};
};

/**
 * Get event by id
 *
 * @param {number} id the id of the event
 *
 * @return {Promise<object>} the event
 *
 * @throws {ServiceError.notFound} if the event is not found
 */
const getById = async (id) => {
  debugLog(`Fetching event with id ${id}`);
  const event = await eventRepository.findById(id);
  if (!event) {
    throw ServiceError.notFound(`Event with id ${id} not found`, {id});
  }
  return event;
};

/**
 * Create a new event
 *
 * @param {object} event The event to create
 * @param {string} event.name The name of the event
 * @param {string} event.description The description of the event
 * @param {number} event.addressId The id of the address of the event
 * @param {string} event.startDateTime The start date and time of the event
 * @param {string} event.endDateTime The end date and time of the event
 * @param {string} event.targetAudience The target audience of the event
 * @param {number} event.yearId The id of the year of the event
 *
 * @return {Promise<object>} the created event
 */
const create = async (event) => {
  debugLog('Creating new event', event);
  const id = await eventRepository.create(event);
  return getById(id);
};

/**
 * Update an event by id
 *
 * @param {number} id The id of the event to update
 * @param {object} updatedEvent The event to update
 * @param {string} updatedEvent.name The name of the event
 * @param {string} updatedEvent.description The description of the event
 * @param {number} updatedEvent.addressId The id of the address of the event
 * @param {string} updatedEvent.startDateTime The start date and time of the
 * event
 * @param {string} updatedEvent.endDateTime The end date and time of the event
 * @param {string} updatedEvent.targetAudience The target audience of the event
 * @param {number} updatedEvent.yearId The id of the year of the event
 *
 * @return {Promise<object>} the updated event
 *
 * @throws {ServiceError.notFound} if the event is not found
 */
const updateById = async (id, updatedEvent) => {
  debugLog(`Updating event with id ${id}`, updatedEvent);
  await eventRepository.updateById(id, updatedEvent);
  return getById(id);
};

/**
 * Delete an event by id
 *
 * @param {number} id The id of the event to delete
 *
 * @throws {ServiceError.notFound} if the event is not found
 */
const deleteById = async (id) => {
  debugLog(`Deleting event with id ${id}`);
  const deleted = await eventRepository.deleteById(id);
  if (!deleted) {
    throw ServiceError.notFound(`Event with id ${id} not found`, {id});
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
