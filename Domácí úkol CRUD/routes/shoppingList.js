const express = require("express");
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

// Vytvoření nového seznamu
router.post('/', shoppingListController.createShoppingList);

// Smazání seznamu
router.delete('/:id', shoppingListController.deleteShoppingList);

// Aktualizace stavu položky
router.put('/:id/items/:itemId/status', shoppingListController.updateItemStatus);

module.exports = router;

// Mock data
const shoppingLists = [
    {
        id: "1",
        title: "Groceries",
        owner: "2",
        isArchived: false,
        items: [
            { id: "1", name: "Milk", status: "unresolved" },
            { id: "2", name: "Bread", status: "resolved" }
        ]
    }
];

// Get shopping lists for a user
router.get("/", (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: "Missing userId in query" });
    }
    const userLists = shoppingLists.filter((list) => list.owner === userId);
    res.json({ shoppingLists: userLists });
});

// Create a new shopping list
router.post("/", (req, res) => {
    const { title, owner } = req.body;
    if (!title || !owner) {
        return res.status(400).json({ error: "Missing title or owner in body" });
    }
    const newList = {
        id: `${shoppingLists.length + 1}`,
        title,
        owner,
        isArchived: false,
        items: []
    };
    shoppingLists.push(newList);
    res.json(newList);
});

// Delete a shopping list
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const index = shoppingLists.findIndex((list) => list.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Shopping list not found" });
    }
    shoppingLists.splice(index, 1);
    res.json({ success: true });
});

// Add an item to a shopping list
router.post("/:id/items", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const list = shoppingLists.find((list) => list.id === id);
    if (!list) {
        return res.status(404).json({ error: "Shopping list not found" });
    }
    const newItem = {
        id: `${list.items.length + 1}`,
        name,
        status: "unresolved"
    };
    list.items.push(newItem);
    res.json(newItem);
});

// Update item status
router.put("/:id/items/:itemId/status", (req, res) => {
    const { id, itemId } = req.params;
    const { status } = req.body;
    const list = shoppingLists.find((list) => list.id === id);
    if (!list) {
        return res.status(404).json({ error: "Shopping list not found" });
    }
    const item = list.items.find((item) => item.id === itemId);
    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }
    item.status = status;
    res.json({ success: true, updatedItem: item });
});

module.exports = router;