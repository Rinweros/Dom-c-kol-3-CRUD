const ShoppingList = require('../models/shoppingListModel');

// Načtení všech shopping listů
exports.getShoppingLists = async (req, res) => {
  try {
    const shoppingLists = await ShoppingList.find();
    res.status(200).json(shoppingLists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch shopping lists' });
  }
};

// Načtení jednoho shopping listu podle ID
exports.getShoppingList = async (req, res) => {
  const { id } = req.params;

  try {
    const shoppingList = await ShoppingList.findById(id);
    if (!shoppingList) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }
    res.status(200).json(shoppingList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch shopping list' });
  }
};

// Vytvoření nového shopping listu
exports.createShoppingList = async (req, res) => {
  const { title, owner } = req.body;

  if (!title || !owner) {
    return res.status(400).json({ error: 'title and owner are required' });
  }

  try {
    const newList = new ShoppingList({
      title,
      owner,
    });

    await newList.save();

    res.status(201).json({
      id: newList._id,
      title: newList.title,
      owner: newList.owner,
      isArchived: newList.isArchived,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create shopping list' });
  }
};

// Aktualizace shopping listu podle ID
exports.updateShoppingList = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const updatedList = await ShoppingList.findByIdAndUpdate(
      id,
      { title },
      { new: true } // Vrací aktualizovaný dokument
    );

    if (!updatedList) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }

    res.status(200).json(updatedList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update shopping list' });
  }
};

// Smazání shopping listu podle ID
exports.deleteShoppingList = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedList = await ShoppingList.findByIdAndDelete(id);
    if (!deletedList) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete shopping list' });
  }
};

// Aktualizace stavu položky v seznamu
exports.updateItemStatus = async (req, res) => {
  const { id, itemId } = req.params;
  const { status } = req.body;

  if (typeof status !== 'boolean') {
    return res.status(400).json({ error: 'Status must be a boolean' });
  }

  try {
    const shoppingList = await ShoppingList.findById(id);
    if (!shoppingList) {
      return res.status(404).json({ error: 'Shopping list not found' });
    }

    const item = shoppingList.items.id(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    item.resolved = status;
    await shoppingList.save();

    res.status(200).json({
      success: true,
      status: item.resolved,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item status' });
  }
};
