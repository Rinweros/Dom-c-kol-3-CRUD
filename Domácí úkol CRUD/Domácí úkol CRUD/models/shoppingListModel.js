const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: String, required: true },
  isArchived: { type: Boolean, default: false },
  items: [{
    name: String,
    resolved: { type: Boolean, default: false }
  }]
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

module.exports = ShoppingList;
