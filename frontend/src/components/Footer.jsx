import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Footer.css";

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container-fluid foot">
      <div className="row text-center text-md-start">
        {/* LEFT */}
        <div className="col-12 col-md-4 p-3 ps-md-5 mb-4">
          <h2>MyRecipesCloud</h2>
          <p>
            Discover and share your family’s favorite recipes. Preserve your
            traditions, try new flavors, and build your own cloud of memories —
            one recipe at a time.
          </p>
        </div>

        {/* MIDDLE */}
        <div className="col-12 col-md-3 p-3 mb-4">
          <h2>Quick Links</h2>
          <ul className="list-unstyled">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/allrecipe">Recipes</Link>
            </li>

            <li>
              <Link
                to={user ? "/addrecipe" : "/login"}
                onClick={() => {
                  if (!user) alert("Please login first to add a recipe");
                }}
              >
                Add Recipe
              </Link>
            </li>

            <li className="dropdown">
              <span
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Category
              </span>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/breakfast">
                    Breakfast
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/lunch">
                    Lunch
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/dinner">
                    Dinner
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/snacks">
                    Snacks
                  </Link>
                </li>
              </ul>
            </li>

            {!user && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="col-12 col-md-3 p-3">
          <h2>Get In Touch</h2>
          <p>
            <a href="mailto:Nikitanawandar3108@gmail.com">
              Nikitanawandar3108@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
