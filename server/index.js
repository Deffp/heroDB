require('dotenv').config();
const express = require('express');
const objectId = require('mongodb').ObjectID;
const { MongoClient } = require('mongodb');
const cors = require('cors');
const paginate = require('jw-paginate');

const app = express();
const mongoDB = 'superheros';

app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGO_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  try {
    const conn = await client.connect();
    const db = conn.db(mongoDB);

    app.set('db', db);

    app.listen(process.env.PORT, () => {
      console.log('Server start.');
    });
  } catch (e) {
    console.log(e);
  }
})();

app.get('/superheros', async (req, res) => {
  const db = req.app.get('db');
  const heroList = await db.collection('superheros').find({}).toArray();

  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const pager = paginate(heroList.length, page, pageSize);

  const pageOfItems = heroList.slice(pager.startIndex, pager.endIndex + 1);
  return res.json({ pager, pageOfItems });
});

app.post('/superheros', async (req, res) => {
  const { _id } = req.body;
  const db = req.app.get('db');
  const hero = await db.collection('superheros').findOne(objectId(_id));
  return res.json({ hero });
});

app.post('/add', async (req, res) => {
  const {
    hero: { nickname, real_name, origin_description, superpowers, catch_phrase, image },
  } = req.body;
  const db = req.app.get('db');
  await db
    .collection('superheros')
    .insertOne({ nickname, real_name, origin_description, superpowers, catch_phrase, image });
});

app.put('/superheros', async (req, res) => {
  const {
    hero: { nickname, real_name, origin_description, superpowers, catch_phrase, image },
  } = req.body;

  const db = req.app.get('db');
  await db
    .collection('superheros')
    .updateOne(
      { nickname },
      { $set: { real_name, origin_description, superpowers, catch_phrase, image } },
    );
});

app.delete('/superheros', async (req, res) => {
  const { _id } = req.body;
  const db = req.app.get('db');
  const removeHero = await db.collection('superheros').deleteOne({ _id: objectId(_id) });
  return res.json({ removeHero });
});
