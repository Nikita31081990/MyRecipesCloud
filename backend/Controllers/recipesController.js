const recipeSchema = require("../Models/recipeModel");
const cloudinary = require("cloudinary").v2;

/* ================= CREATE RECIPE ================= */
exports.createRecipes = async (req, res) => {
  try {
    const {
      title,
      ingredients,
      procedure,
      category,
      mealType,
      preparationTime,
    } = req.body;

    // ✅ FILES
    const imageFile = req.files?.image?.[0];
    const videoFile = req.files?.video?.[0]; // optional

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    if (!title || !ingredients || !procedure || !category || !preparationTime) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    let videoData = null;

    if (req.files?.video) {
      videoData = {
        video_url: req.files.video[0].path,
        public_id: req.files.video[0].filename,
      };
    }

    const ingredientsArray =
      typeof ingredients === "string"
        ? ingredients.split(",").map((i) => i.trim())
        : ingredients;

    const recipe = await recipeSchema.create({
      title,
      image: {
        image_url: imageFile.path,
        public_id: imageFile.filename,
      },
      ingredients: ingredientsArray,
      procedure,

      // ✅ VIDEO OBJECT
      video: videoData,

      category,
      mealType,
      preparationTime,
      createdBy: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Recipe added successfully",
      data: recipe,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server problem",
    });
  }
};

/* ================= GET ALL RECIPES ================= */
exports.getAllRecipes = async (req, res) => {
  try {
    const response = await recipeSchema
      .find({})
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All recipes fetched",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server problem",
    });
  }
};

/* ================= GET SINGLE RECIPE ================= */
exports.getRecipes = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const response = await recipeSchema.findById(recipeId);

    return res.status(200).json({
      success: true,
      message: "Recipe fetched",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server problem",
    });
  }
};

/* ================= UPDATE RECIPE ================= */
exports.updateRecipes = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await recipeSchema.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    const imageFile = req.files?.image?.[0];
    const videoFile = req.files?.video?.[0];

    if (imageFile) {
      await cloudinary.uploader.destroy(recipe.image.public_id);
      recipe.image = {
        image_url: imageFile.path,
        public_id: imageFile.filename,
      };
    }

    // let videoData = null;

    // if (req.files?.video) {
    //   videoData = {
    //     video_url: req.files.video[0].path,
    //     public_id: req.files.video[0].filename,
    //   };
    // }

    // if (videoFile) {
    //   if (recipe.video?.public_id) {
    //     await cloudinary.uploader.destroy(recipe.video.public_id);
    //   }

    //   recipe.video = {
    //     video_url: videoFile.path,
    //     public_id: videoFile.filename,
    //   };
    // }

    const {
      title,
      ingredients,
      procedure,
      category,
      mealType,
      preparationTime,
    } = req.body;

    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients
      ? ingredients.split(",").map((i) => i.trim())
      : recipe.ingredients;
    recipe.procedure = procedure || recipe.procedure;
    recipe.category = category || recipe.category;
    recipe.mealType = mealType || recipe.mealType;
    recipe.preparationTime = preparationTime || recipe.preparationTime;

    await recipe.save();

    return res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: recipe,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server problem",
    });
  }
};

/* ================= DELETE RECIPE ================= */
exports.deleteRecipes = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const recipe = await recipeSchema.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    await cloudinary.uploader.destroy(recipe.image.public_id);
    await recipeSchema.findByIdAndDelete(recipeId);

    return res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server problem",
    });
  }
};

exports.searchRecipes = async (req, res) => {
  try {
    const { q, category } = req.query;

    let filter = {};

    if (q && q.trim() !== "") {
      const words = q.split(" ").filter(Boolean);

      filter.$or = [
        { title: { $regex: words.join("|"), $options: "i" } },
        { ingredients: { $regex: words.join("|"), $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    const recipes = await recipeSchema
      .find(filter)
      .populate("createdBy", "name");

    res.status(200).json({
      success: true,
      data: recipes,
    });
  } catch (error) {
    console.error("SEARCH ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= CATEGORY FILTER ================= */
exports.getRecipesByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const recipes = await recipeSchema.find({ category });

    return res.status(200).json({
      success: true,
      message: `${category} recipes fetched successfully`,
      data: recipes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server problem",
    });
  }
};

exports.addRating = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { value } = req.body; // ⭐ 1–5
    const userId = req.id; // from auth middleware

    // 🔐 auth safety
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    // ⭐ rating validation
    if (!value || value < 1 || value > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const recipe = await recipeSchema.findById(recipeId);

    // 🧾 recipe check
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // ❌ same user dubara rating na de
    const alreadyRated = recipe.reviews.find(
      (r) => r.user.toString() === userId.toString()
    );

    if (alreadyRated) {
      alreadyRated.value = value;
    } else {
      recipe.reviews.push({ user: userId, value });
    }

    await recipe.save();

    res.status(200).json({
      success: true,
      averageRating: recipe.averageRating,
      totalReviews: recipe.reviews.length, // use reviews here
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Search, Filter, Sorting, Pagination=================req.query(important)
