const cors = require('cors');
const express = require('express');

const { port } = require('../config');
const grpcClient = require('../grpc/client');
const logger = require('../helper/logger');

const app = express();
const appPort = port || 4000;

// Used to parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  logger.info(`ACCESS LOG: ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Ok');
});

app.get('/meterusage', (req, res) => {
  const filter = { limit: 10, offset: 0 };

  if (req.query.pageSize) {
    filter.limit = req.query.pageSize;
  }

  if (req.query.page) {
    filter.offset = (req.query.page - 1) * filter.limit;
  }

  grpcClient.usageList(filter, (err, data) => {
    if (!err) {
      return res.send(data);
    }

    logger.error('list fetch error:', err);

    return res.send({});
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(appPort, () => {
    logger.info(`HTTP server: Started at http://localhost:${appPort}`);
  });
}

module.exports = app;
