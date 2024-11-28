const express = require("express");
const router = express.Router();

// Mock data
const users = [
    { id: "1", name: "Admin User", role: "admin" },
    { id: "2", name: "John Owner", role: "owner" },
    { id: "3", name: "Jane Member", role: "member" }
];

// Get all users
router.get("/", (req, res) => {
    res.json({ users });
});

// Get a single user by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
});

// Delete a user
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    users.splice(index, 1);
    res.json({ success: true });
});

// Update user role
router.put("/:id/role", (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const user = users.find((u) => u.id === id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    user.role = role;
    res.json({ success: true, updatedUser: user });
});

module.exports = router;