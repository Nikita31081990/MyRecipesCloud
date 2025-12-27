import React from "react";
import Recipes from "../components/Recipes";

const Breakfast = () => {
  return (
    <div>
      <h1 className="text-center">Breakfast</h1>
      <Recipes category="breakfast" />
    </div>
  );
};

export default Breakfast;
