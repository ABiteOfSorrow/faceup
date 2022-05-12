var express = require("express");
var router = express.Router();
var cloudinary = require("cloudinary").v2;
var fs = require("fs");
var uniqid = require("uniqid");

cloudinary.config({
  cloud_name: "rupo",
  api_key: "844975946581267",
  api_secret: "vxmNTX3GRyB5KMi8xWp9IM8u2zs",
});

router.post("/upload", async function (req, res, next) {
  var imagePath = "./tmp/" + uniqid() + ".jpg";
  var resultCopy = await req.files.avatar.mv(imagePath);

  console.log(req.files.avatar);
  console.log(req.files.avatar.name); // nom d'origine de l'image
  console.log(req.files.avatar.mimetype); // format de fichier
  console.log(req.files.avatar.data); // données brutes du fichier

  if (!resultCopy) {
    var result = await cloudinary.uploader.upload(imagePath);
    res.json({ result: true, message: "File uploaded!", photo: result });
  } else {
    res.json({ result: false, message: resultCopy });
  }
  fs.unlinkSync(imagePath);
});

module.exports = router;
