const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    //when we use cloudinary that time required this type  of object
    image: {
      image_url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },

    ingredients: {
      type: [String], // list of ingredients
      required: true,
    },

    procedure: {
      type: String,
      required: true,
    },

    video: {
      video_url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },

    category: {
      type: String, // primary category
      enum: ["breakfast", "lunch", "dinner", "snacks"],
      required: true,
    },

    mealType: {
      type: [String], // multiple allowed
      enum: ["lunch", "dinner"],
    },

    preparationTime: {
      type: String, // Example: "20 minutes"
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // logged in user
      required: true,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        value: { type: Number, min: 1, max: 5, required: true },
        comment: String,
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

recipeSchema.virtual("averageRating").get(function () {
  if (!this.reviews.length) return 0;
  const total = this.reviews.reduce((sum, r) => sum + r.value, 0);
  return Number((total / this.reviews.length).toFixed(1));
});

module.exports = mongoose.model("RECIPE", recipeSchema);
