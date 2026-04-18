const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/projects");
const authMiddleware = require("../middleware/authMiddleware");

// PUBLIC ROUTES
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

// PROTECTED ROUTES
router.post("/", authMiddleware, ctrl.create);
router.put("/:id", authMiddleware, ctrl.update);
router.delete("/:id", authMiddleware, ctrl.remove);

module.exports = router;