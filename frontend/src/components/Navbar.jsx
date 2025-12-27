import React from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand col-5" to="/">
          <h2> MyRecipesCloud</h2>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse col-7"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/allrecipe"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Recipes
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={user ? "/addrecipe" : "/login"}
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                onClick={() => {
                  if (!user) {
                    alert("Please login first to add a recipe");
                  }
                }}
              >
                Add Recipe
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle "
                role="button"
                data-bs-toggle="dropdown"
              >
                Category
              </span>

              <ul className="dropdown-menu">
                <li>
                  <Link to="/breakfast" className="dropdown-item">
                    Breakfast
                  </Link>
                </li>
                <li>
                  <Link to="/lunch" className="dropdown-item">
                    Lunch
                  </Link>
                </li>
                <li>
                  <Link to="/dinner" className="dropdown-item">
                    Dinner
                  </Link>
                </li>
                <li>
                  <Link to="/snacks" className="dropdown-item">
                    Snacks
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* <button
            className="btn btn-outline-success"
            onClick={() => navigate("/login")}
          >
            Login
          </button> */}
          {user ? (
            <>
              <span>Hello, {user.name} </span>
              <button
                className="btn mx-2"
                style={{ backgroundColor: "#ef993c", color: "#fff" }}
                onClick={logout}
              >
                {" "}
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button
                className="btn mx-2"
                style={{ backgroundColor: "#ef993c", color: "#fff" }}
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
