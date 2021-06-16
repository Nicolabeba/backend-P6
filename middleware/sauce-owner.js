const Sauce = require("../models/Sauce");

module.exports = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId !== req.tokenUserId) {
        throw "invalid user";
      } else {
        next();
      }
    })
    .catch((error) => res.status(401).json({ error }));
};
