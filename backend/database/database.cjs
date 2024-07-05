const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

try{
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SEARCHSHIELD', { useNewUrlParser: true, useUnifiedTopology: true });
}catch (err) {console.log("mongoose error")}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;

