require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.POSTG_HOST,
  port: process.env.POSTG_PORT,
  username: process.env.POSTG_USERNAME,
  password: process.env.POSTG_PASSWORD,
  database: process.env.POSTG_DATABASE,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
