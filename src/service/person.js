const { getLogger } = require('../core/logging');

let PEOPLE = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    cellphone: '1234567890'
  }, {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    cellphone: '0987654321'
  }
];

const getAll = () => {
  return PEOPLE;
}

const getById = (id) => {
  throw new Error('Not implemented');
}

const create = ({firstName, lastName, cellphone}) => {
  throw new Error('Not implemented');
}

const updateById = (id) => {
  throw new Error('Not implemented');
}

const deleteById = (id) => {
  throw new Error('Not implemented');
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
