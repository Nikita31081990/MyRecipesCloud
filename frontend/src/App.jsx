import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Login from "./pages/Login";
import AddRecipe from "./pages/AddRecipe";
import Breakfast from "./pages/Breakfast";
import Lunch from "./pages/Lunch";
import Dinner from "./pages/Dinner";
import Snacks from "./pages/Snacks";
import AllRecipes from "./pages/AllRecipes";
import SearchRecipes from "./pages/SearchRecipes";

import { Routes, Route } from "react-router-dom";
import "./index.css";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="abc col-11 mx-auto my-5 rounded-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipeDetails/:id" element={<RecipeDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addrecipe" element={<AddRecipe />} />
          <Route path="/breakfast" element={<Breakfast />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/dinner" element={<Dinner />} />
          <Route path="/snacks" element={<Snacks />} />
          <Route path="/allrecipe" element={<AllRecipes />} />
          <Route path="/searchrecipe" element={<SearchRecipes />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
