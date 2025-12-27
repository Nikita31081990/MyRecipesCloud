const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === "image") {
      return {
        folder: "recipes/images",
        resource_type: "image",
      };
    }

    if (file.fieldname === "video") {
      return {
        folder: "recipes/videos",
        resource_type: "video",
      };
    }
  },
});

const upload = multer({ storage });

module.exports = upload;

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "recipes", // cloudinary folder
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;
