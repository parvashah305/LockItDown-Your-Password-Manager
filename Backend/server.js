const express = require('express')
const dotenv =require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')
dotenv.config()

const port = 3000
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const app = express()

app.use(bodyparser.json())
app.use(cors())

const dbName = 'passop';

client.connect();

app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/', async (req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.json({success:true,result:findResult})
})

app.delete('/', async (req, res) => {
  const password=req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.json({success:true,result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})