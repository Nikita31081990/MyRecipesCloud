import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../imgs/banner.jpg";
import "./Banner.css"; // 📌 Import CSS

const Banner = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="card text-bg-dark">
      <img
        src={img1}
        className="card-img"
        alt="Banner"
        style={{ maxHeight: "500px", objectFit: "cover" }}
      />

      <div className="card-img-overlay d-flex justify-content-center align-items-start">
        <div className="bluebox text-center">
          <p className="card-title bannerTxt">Discover & Share Recipes</p>

          <form
            className="d-flex justify-content-center"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/searchrecipe?q=${search}`);
            }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
