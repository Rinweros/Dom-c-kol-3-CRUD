const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shoppingListsRoutes = require('./routes/shoppingLists');

// Inicializace aplikace
const app = express();
const port = 3000;

// Middleware pro zpracování JSON
app.use(bodyParser.json());

// Připojení k MongoDB
mongoose.connect('mongodb://localhost:27017/shoppingLists', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Nastavení rout
app.use('/shopping-lists', shoppingListsRoutes);

// Spuštění serveru
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
