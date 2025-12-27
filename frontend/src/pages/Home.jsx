import React from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Recipes from "../components/Recipes";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <h1 className="pt-3 text-center">Recent Recipes</h1>
      <Recipes limit={6} />
    </div>
  );
};

export default Home;
