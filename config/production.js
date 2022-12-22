module.exports = {
  log: {
    level: "info",
    disabled: false,
  },
  cors: {
    origins: ["http://localhost:3000"],
    maxAge: 3 * 60 * 60, // 3 hours in seconds
  },
  database: {
    client: "mysql2",
    name: "chirosite",
  },
};
