const { parse } = require('fast-csv');

const db = require('../src/db/main');

const processRecord = async (record) => {
  await db.insert({ ...record, createdAt: new Date(record.time) });
};

const main = async () => {
  await db.remove({}, { multi: true });

  process.stdin
    .pipe(parse({ headers: true }))
    .on('error', (error) => console.error(error))
    .on('data', processRecord)
    .on('end', (rowCount) => {
      console.log(`Successfully imported ${rowCount} contacts`);
    });
};

main();
