let PEOPLE = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    cellphone: '1234567890',
    address: {
      id: 1,
      street: 'Dorpsstraat',
      number: '1',
      city: 'Houthulst',
      zip: '8650'
    }
  }, {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    cellphone: '0987654321',
    address: {
      id: 2,
      street: 'Dorpsstraat 2',
      city: 'Houthulst',
      zip: '8650'
    }
  }
];

let ADDRESSES = [
  {
    id: 1,
    street: 'Dorpsstraat',
    number: '1',
    city: 'Houthulst',
    zip: '8650'
  },
  {
    id: 2,
    street: 'Stadenstraat',
    number: '15b',
    city: 'Houthulst',
    zip: '8650'
  }
];

module.exports = {
  PEOPLE,
  ADDRESSES
};