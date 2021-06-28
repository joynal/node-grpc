const grpc = require('@grpc/grpc-js');

const MeterProto = require('./meterProto');
const { grpcServerPort } = require('../config');

const client = new MeterProto.MeterUsage(
  `localhost:${grpcServerPort}`,
  grpc.credentials.createInsecure(),
);

module.exports = client;
