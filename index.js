require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
app.use(express.json());

async function connectToDatabase() {
    try {
      await mongoose.connect("mongodb://localhost:27017/item_database");
      console.log('Connection successful to MongoDB.');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
}

app.use('/api/items', itemRoutes);

const port =  process.env.PORT || 3000;
app.listen(port, ()=>{
  connectToDatabase();
    console.log('Server running on localhost', port);
})