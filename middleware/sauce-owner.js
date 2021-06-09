const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
  try {
    const sauceUserSchema = mongoose.model("Sauce", sauceSchema);
    const sauce = sauceUserSchema.findById(req.params.id);

    if (sauce.userId && sauce.userId !== req.tokenUserId) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error } | "Requête non authentifiée !");
  }
};
