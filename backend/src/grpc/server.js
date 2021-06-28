const grpc = require('@grpc/grpc-js');

const { usageList } = require('../api');
const { grpcServerPort } = require('../config');
const meterProto = require('./meterProto');

const logger = require('../helper/logger');

const server = new grpc.Server();

server.addService(meterProto.MeterUsage.service, {
  usageList,
});

server.bindAsync(
  `localhost:${grpcServerPort}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
    logger.info(`grpc: Server running at http://127.0.0.1:${grpcServerPort}`);
  },
);

module.exports = server;
