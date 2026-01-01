require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const dbConnection = require("./config/dbConnection");
dbConnection();

// app.use(
//   cors({
//     origin: "http://localhost:5173", // React frontend
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: ["http://localhost:5173", "https://myrecipescloud.netlify.app"],
    credentials: true,
  })
);

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./Routes/userRoutes");
app.use("/api/user", userRoutes);

const recipeRoutes = require("./Routes/recipesRoutes");
app.use("/api/recipes", recipeRoutes);

PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server is active", { PORT });
});
