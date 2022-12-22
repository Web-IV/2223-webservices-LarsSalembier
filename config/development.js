module.exports = {
  log: {
    level: "silly",
    disabled: false,
  },
  cors: {
    origins: ["http://localhost:3000"],
    maxAge: 3 * 60 * 60, // 3 hours in seconds
  },
  database: {
    client: "mysql2",
    host: "localhost",
    port: 3306,
    name: "chirosite",
    username: "root",
    password: "root",
  },
};
