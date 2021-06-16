const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const saucesCtrl = require("../controllers/sauces");
const sauceOwner = require("../middleware/sauce-owner");

router.post("/", auth, multer, saucesCtrl.createSauce);
router.put("/:id", auth, sauceOwner, multer, saucesCtrl.modifySauce);
router.delete("/:id", auth, sauceOwner, saucesCtrl.deleteSauce);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.get("/", auth, saucesCtrl.getAllSauces);
router.post("/:id/like", saucesCtrl.likeDisLike);

module.exports = router;
