const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createRecipes,
  getAllRecipes,
  getRecipes,
  updateRecipes,
  deleteRecipes,
  searchRecipes,
  getRecipesByCategory,
  addRating,
} = require("../Controllers/recipesController");

const { authentication } = require("../middleware/authMiddleware");

// ✅ CREATE (image required)
router.post(
  "/createRecipes",
  authentication,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createRecipes
);

// ✅ GET ALL
router.get("/getAllRecipes", getAllRecipes);

// ✅ GET SINGLE
router.get("/getRecipes/:id", getRecipes);

// ✅ UPDATE (image optional)
router.put(
  "/updateRecipes/:id",
  authentication,
  upload.single("image"),
  updateRecipes
);

// ✅ DELETE
router.delete("/deleteRecipes/:id", authentication, deleteRecipes);
router.get("/search", searchRecipes);

router.get("/recipes", getRecipesByCategory);

// router.post("/:recipeId/rating", addRating);
router.post("/:recipeId/rating", authentication, addRating);

module.exports = router;
