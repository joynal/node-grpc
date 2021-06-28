const { config } = require('dotenv');

config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.HTTP_SERVER_PORT,
  grpcServerPort:
    process.env.NODE_ENV === 'test'
      ? process.env.GRPC_SERVER_TESt_PORT
      : process.env.GRPC_SERVER_PORT,
};
