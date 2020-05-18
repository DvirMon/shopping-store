const multer = require("multer");
const uuid = require("uuid/v4");
const fs = require("fs");

// how the file should be stored
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (request, file, cb) {
    const fileName = uuid() + ".jpg";
    request.body.imagePath = fileName;
    cb(null, fileName);
  },
});

// allow only jpg.jpeg extension
const fileFilter = (request, file, cb) => {
  if (!file) {
    cb(new Error("error"), false);
  }
  if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    // except file
    cb(null, true);
  } else {
    // reject file
    cb(null, false);
  }
};

// function do delete local file
const deleteImageLocally = (path) => {
  fs.unlink("./uploads/" + path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

// init multer
const upload = multer({ storage, fileFilter }).single("imagePath");

module.exports = {
  upload,
  deleteImageLocally,
};
