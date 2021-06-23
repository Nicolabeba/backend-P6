const Sauce = require("../models/Sauce");
const fs = require("fs");
const { error } = require("console");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  console.log(res);
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const fileName = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${fileName}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.likeDisLike = (req, res, next) => {
  const sauceId = req.params.id;
  const like = req.body.like;
  const userId = req.body.userId;

  Sauce.findOne({ _id: sauceId })
    .then((sauce) => {
      switch (like) {
        case 1:
          sauce.likes += 1;
          sauce.usersLiked.push(userId);
          break;
        case 0:
          if (sauce.usersLiked.includes(userId)) {
            sauce.likes -= 1;
            sauce.usersLiked.remove(userId);
          } else if (sauce.usersDisliked.includes(userId)) {
            sauce.dislikes -= 1;
            sauce.usersDisliked.remove(userId);
          }
          break;
        case -1:
          sauce.dislikes += 1;
          sauce.usersDisliked.push(userId);
          break;
      }
      Sauce.updateOne({ _id: sauceId }, { $set: { ...sauce } })
        .then(() => {
          res.status(200).json({
            message: "Informations de la sauce modifiées !",
          });
        })
        .catch(() => res.status(400).json({ error }));
    })
    .catch(() => res.status(500).json({ error }));
};
