import React from "react";
import Recipes from "../components/Recipes";

const Dinner = () => {
  return (
    <div>
      <h1 className="text-center">Dinner</h1>

      <Recipes category="dinner" />
    </div>
  );
};

export default Dinner;
