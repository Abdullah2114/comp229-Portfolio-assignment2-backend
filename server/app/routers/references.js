const express = require("express");
const router = express.Router();

const referencesController = require("../controllers/references");

router.post("/", referencesController.create);
router.get("/", referencesController.getAll);
router.get("/:id", referencesController.getOne);
router.put("/:id", referencesController.update);
router.delete("/:id", referencesController.remove);

module.exports = router;