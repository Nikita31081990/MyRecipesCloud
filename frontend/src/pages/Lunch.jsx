import React from "react";
import Recipes from "../components/Recipes";

const Lunch = () => {
  return (
    <div>
      <h1 className="text-center">Lunch</h1>
      <Recipes category="lunch" />
    </div>
  );
};

export default Lunch;
