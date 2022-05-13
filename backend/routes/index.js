var express = require("express");
var router = express.Router();
var cloudinary = require("cloudinary").v2;
var fs = require("fs");
var uniqid = require("uniqid");
var request = require("sync-request");

// cloudinary
cloudinary.config({
  cloud_name: "rupo",
  api_key: "844975946581267",
  api_secret: "vxmNTX3GRyB5KMi8xWp9IM8u2zs",
});

//Request Post for upload photo to cloudinary & send to frondend
router.post("/upload", async function (req, res, next) {
  var imagePath = "./tmp/" + uniqid() + ".jpg";
  var resultCopy = await req.files.avatar.mv(imagePath);

  // console.log(req.files.avatar);
  // console.log(req.files.avatar.name); // nom d'origine de l'image
  // console.log(req.files.avatar.mimetype); // format de fichier
  // console.log(req.files.avatar.data); // données brutes du fichier

  if (!resultCopy) {
    var result = await cloudinary.uploader.upload(imagePath);
    var options = {
      json: {
        apiKey: "5c0a5d392c1745d2ae84dc0b1483bfd2",
        image: result.url,
      },
    };

    //Face recognize API
    var resultDetectionRaw = await request(
      "POST",
      "https://lacapsule-faceapi.herokuapp.com/api/detect",
      options
    );
    var resultDetection = await resultDetectionRaw.body;
    resultDetection = await JSON.parse(resultDetection);
    console.log(resultDetection.detectedFaces);
    res.json({
      result: true,
      message: "File uploaded!",
      photo: result,
      resultDetection: resultDetection.detectedFaces,
    });
  } else {
    res.json({ result: false, message: resultCopy });
  }
  fs.unlinkSync(imagePath);
});

module.exports = router;
