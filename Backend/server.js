// const express = require('express')
// const dotenv =require('dotenv')
// const { MongoClient } = require('mongodb');
// const bodyparser = require('body-parser')
// const cors = require('cors')
// dotenv.config()

// const port = 3000
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);
// const app = express()

// app.use(bodyparser.json())
// app.use(cors())

// const dbName = 'passop';

// client.connect();

// app.get('/', async (req, res) => {
//   const db = client.db(dbName);
//   const collection = db.collection('passwords');
//   const findResult = await collection.find({}).toArray();
//   res.json(findResult)
// })

// app.post('/', async (req, res) => {
//   const password=req.body
//   const db = client.db(dbName);
//   const collection = db.collection('passwords');
//   const findResult = await collection.insertOne(password);
//   res.json({success:true,result:findResult})
// })

// app.delete('/', async (req, res) => {
//   const password=req.body
//   const db = client.db(dbName);
//   const collection = db.collection('passwords');
//   const findResult = await collection.deleteOne(password);
//   res.json({success:true,result:findResult})
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const Password = require('./models/Password'); 

dotenv.config();

const port = 3000;
const app = express();

app.use(bodyparser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', "https://lock-it-down-your-password-manager-parvashah.vercel.app");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use(cors({
  origin: "https://lock-it-down-your-password-manager-parvashah.vercel.app", 
  credentials: true
}));


const dbUrl = process.env.MONGO_URI;
console.log(dbUrl)

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB using Mongoose"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.get('/', async (req, res) => {
  try {
    const passwords = await Password.find({});
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching passwords', error });
  }
});

app.post('/', async (req, res) => {
  try {
    const password = new Password(req.body);
    const savedPassword = await password.save();
    res.json({ success: true, result: savedPassword });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving password', error });
  }
});

app.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    const deletedPassword = await Password.findOneAndDelete({ id });
    res.json({ success: true, result: deletedPassword });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting password', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});