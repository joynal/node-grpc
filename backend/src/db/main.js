const DataStore = require('nedb-promises');

const { env } = require('../config');

module.exports = DataStore.create({
  autoload: true,
  filename: `./data/meter_usage_${env}.db`,
});
