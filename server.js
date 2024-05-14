const express = require('express');

const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// connect to the mongodb database

mongoose.connect('mongodb://localhost/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// define a schema for our data

const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
})

// define a model based on the schema

const Item = mongoose.model(‘Item’, itemSchema);

// define routes

// Define routes

app.get(‘/items’, async (req, res) => {

    const items = await Item.find();
  
    res.json(items);
  
  });

  app.post(‘/items’, async (req, res) => {

    const item = new Item(req.body);
  
    await item.save();
  
    res.json(item);
  
  });

  // Start the server

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Server listening on port ${PORT}`);

});