const db = require('./db/main');

const usageList = async (call, cb) => {
  const limit = call.request.limit || 20;
  const offset = call.request.offset || 0;

  const usage = await db.find({}).sort({ createdAt: -1 }).skip(offset).limit(limit);

  const total = await db.count();

  cb(null, { usage, total });
};

module.exports = {
  usageList,
};
