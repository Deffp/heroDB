require('dotenv').config();
const argv = require('yargs').argv;
const { MongoClient } = require('mongodb');
const fs = require('fs');

const client = new MongoClient(process.env.MONGO_HOST, { useUnifiedTopology: true });

(async () => {
  const conn = await client.connect();
  const db = conn.db('superheros');
  const path = argv.path;

  if (!fs.existsSync(path)) {
    console.log(path, 'not found');
    process.exit(1);
  }

  const documents = JSON.parse(fs.readFileSync(path).toString('utf8'));

  const result = await db.collection('superheros').insertMany(documents);
  console.log(result.result);

  process.exit(0);
})();
