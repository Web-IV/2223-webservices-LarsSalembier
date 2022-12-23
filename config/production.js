module.exports = {
  port: 9000,
  log: {
    level: 'info',
    disabled: false,
  },
  cors: {
    origins: ['https://frontendweb-chirosite.onrender.com'],
    maxAge: 3 * 60 * 60, // 3 hours in seconds
  },
  database: {
    client: 'mysql2',
    host: 'localhost',
    port: 3306,
    name: 'chirosite',
  },
};
