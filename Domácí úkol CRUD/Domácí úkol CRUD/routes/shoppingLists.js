const express = require("express");
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

// Načtení všech shopping listů
router.get('/', shoppingListController.getShoppingLists);

// Načtení jednoho shopping listu podle ID
router.get('/:id', shoppingListController.getShoppingList);

// Vytvoření nového shopping listu
router.post('/', shoppingListController.createShoppingList);

// Aktualizace shopping listu podle ID
router.put('/:id', shoppingListController.updateShoppingList);

// Smazání shopping listu podle ID
router.delete('/:id', shoppingListController.deleteShoppingList);

// Aktualizace stavu položky v seznamu
router.put('/:id/items/:itemId/status', shoppingListController.updateItemStatus);

module.exports = router;