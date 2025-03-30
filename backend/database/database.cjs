const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

try{
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
}catch (err) {console.log("mongoose error")}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
 
module.exports = mongoose;

