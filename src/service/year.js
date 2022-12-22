const { getLogger } = require('../utils/logger');
const { YEARS, PEOPLE, LEADERS, EVENTS } = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
}

const getAll = () => {
  debugLog('Fetching all years');
  return { items: YEARS, count: YEARS.length};
}

const getById = (id) => {
  debugLog(`Fetching year with id ${id}`);
  return YEARS.find(year => year.id === id);
}

const create = ({ startDate, endDate, eventIds, leaderIds, headLeaderIds, adultLeaderIds }) => {
  if (!startDate || !endDate || !eventIds || !leaderIds || !headLeaderIds || !adultLeaderIds) {
    throw new Error('Missing required fields');
  }
  for (const eventId of eventIds) {
    const existingEvent = EVENTS.find(event => event.id === eventId);
    if (!existingEvent) {
      throw new Error(`Event with id ${eventId} not found`);
    }
  }
  for (const leaderId of leaderIds) {
    const existingLeader = LEADERS.find(leader => leader.id === leaderId);
    if (!existingLeader) {
      throw new Error(`Leader with id ${leaderId} not found`);
    }
  }
  for (const headLeaderId of headLeaderIds) {
    const existingHeadLeader = PEOPLE.find(headLeader => headLeader.id === headLeaderId);
    if (!existingHeadLeader) {
      throw new Error(`Head leader with id ${headLeaderId} not found`);
    }
  }
  for (const adultLeaderId of adultLeaderIds) {
    const existingAdultLeader = PEOPLE.find(adultLeader => adultLeader.id === adultLeaderId);
    if (!existingAdultLeader) {
      throw new Error(`Adult leader with id ${adultLeaderId} not found`);
    }
  }

  const maxId = Math.max(...YEARS.map(year => year.id));
  const newYear = {
    id: maxId + 1,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    events: eventIds.map(eventId => EVENTS.find(event => event.id === eventId)),
    leaders: leaderIds.map(leaderId => LEADERS.find(leader => leader.id === leaderId)),
    headLeaders: headLeaderIds.map(headLeaderId => PEOPLE.find(headLeader => headLeader.id === headLeaderId)),
    adultLeaders: adultLeaderIds.map(adultLeaderId => PEOPLE.find(adultLeader => adultLeader.id === adultLeaderId))
  };
  debugLog(`Creating year with startDate ${startDate} and endDate ${endDate} and eventIds ${eventIds} and leaderIds ${leaderIds} and headLeaderIds ${headLeaderIds} and adultLeaderIds ${adultLeaderIds}`);
  YEARS.push(newYear);
  return newYear;
}

const updateById = (id, { startDate, endDate, eventIds, leaderIds, headLeaderIds, adultLeaderIds }) => {
  debugLog(`Updating year with id ${id} to startDate ${startDate} and endDate ${endDate} and eventIds ${eventIds} and leaderIds ${leaderIds} and headLeaderIds ${headLeaderIds} and adultLeaderIds ${adultLeaderIds}`);
  if(!startDate || !endDate || !eventIds || !leaderIds || !headLeaderIds || !adultLeaderIds) {
    throw new Error('Missing required fields');
  }
  const year = getById(id);
  if (!year) {
    throw new Error(`Year with id ${id} not found`);
  }
  year.startDate = new Date(startDate);
  year.endDate = new Date(endDate);
  year.events = eventIds.map(eventId => EVENTS.find(event => event.id === eventId));
  year.leaders = leaderIds.map(leaderId => LEADERS.find(leader => leader.id === leaderId));
  year.headLeaders = headLeaderIds.map(headLeaderId => PEOPLE.find(headLeader => headLeader.id === headLeaderId));
  year.adultLeaders = adultLeaderIds.map(adultLeaderId => PEOPLE.find(adultLeader => adultLeader.id === adultLeaderId));
  return year;
}

const deleteById = (id) => {
  debugLog(`Deleting year with id ${id}`);
  YEARS = YEARS.filter(year => year.id !== id);
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}

