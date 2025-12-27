import React from "react";
import Recipes from "../components/Recipes";

const Snacks = () => {
  return (
    <div>
      <h1 className="text-center">Snacks</h1>
      <Recipes category="snacks" />
    </div>
  );
};

export default Snacks;
