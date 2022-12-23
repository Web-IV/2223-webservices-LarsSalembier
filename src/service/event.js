const { getLogger } = require("../core/logging");
const eventRepository = require("../repository/event");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Get all events
 *
 * @returns {Promise<{items: Array, count: number}>} list of events and total count
 */
const getAll = async () => {
  debugLog("Fetching all events");
  const items = await eventRepository.findAll();
  const count = await eventRepository.findCount();
  return { items, count };
};

/**
 * Get event by id
 *
 * @param {number} id the id of the event
 *
 * @returns {Promise<object>} the event
 */
const getById = async (id) => {
  debugLog(`Fetching event with id ${id}`);
  const event = await eventRepository.findById(id);
  if (!event) {
    throw new Error(`Event with id ${id} not found`);
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
 * @returns {Promise<object>} the created event
 */
const create = async (event) => {
  debugLog("Creating new event", event);
  const id = await eventRepository.create(event);
  return getById(id);
};

/**
 * Update an event by id
 *
 * @param {number} id The id of the event to update
 * @param {object} event The event to update
 * @param {string} event.name The name of the event
 * @param {string} event.description The description of the event
 * @param {number} event.addressId The id of the address of the event
 * @param {string} event.startDateTime The start date and time of the event
 * @param {string} event.endDateTime The end date and time of the event
 * @param {string} event.targetAudience The target audience of the event
 * @param {number} event.yearId The id of the year of the event
 *
 * @returns {Promise<object>} the updated event
 */
const updateById = async (id, updatedEventData) => {
  debugLog(`Updating event with id ${id}`, updatedEventData);
  await eventRepository.updateById(id, updatedEventData);
  return getById(id);
};

/**
 * Delete an event by id
 *
 * @param {number} id The id of the event to delete
 */
const deleteById = async (id) => {
  debugLog(`Deleting event with id ${id}`);
  await eventRepository.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
