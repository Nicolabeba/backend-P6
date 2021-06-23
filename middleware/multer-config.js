const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".")[0];
    const extention = MIME_TYPES[file.mimetype];
    if (extention) callback(null, name + Date.now() + "." + extention);
    else console.log("l'extention n est pas supportée");
  },
});

module.exports = multer({ storage }).single("image");
