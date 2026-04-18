const express = require("express");
const router = express.Router();
const referencesController = require("../controllers/references");
const authMiddleware = require("../middleware/authMiddleware");

// PUBLIC ROUTES
router.get("/", referencesController.getAll);
router.get("/:id", referencesController.getOne);

// PROTECTED ROUTES
router.post("/", authMiddleware, referencesController.create);
router.put("/:id", authMiddleware, referencesController.update);
router.delete("/:id", authMiddleware, referencesController.remove);

module.exports = router;