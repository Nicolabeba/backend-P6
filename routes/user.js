const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const fieldValidator = require("../middleware/field-validator");

router.post("/signup", fieldValidator, userCtrl.signup);
router.post("/login", fieldValidator, userCtrl.login);

module.exports = router;
