const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/users");
const authMiddleware = require("../middleware/authMiddleware");

// PUBLIC ROUTES
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

// AUTH ROUTES
router.post("/signup", ctrl.create);   // sign up
router.post("/signin", ctrl.signIn);   // sign in (returns token)

// PROTECTED ROUTES
router.put("/:id", authMiddleware, ctrl.update);
router.delete("/:id", authMiddleware, ctrl.remove);

module.exports = router;