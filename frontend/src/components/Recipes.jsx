import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// const { user } = useContext(AuthContext);

const Recipes = ({ category, limit }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRatings, setUserRatings] = useState({});
  const [searchParams] = useSearchParams();

  // const navigate = useNavigate();

  const searchQuery = searchParams.get("q");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        const params = {};
        if (category) params.category = category;
        if (searchQuery) params.q = searchQuery;

        const res = await api.get("/api/recipes/search", { params });
        setRecipes(res.data.data || []);
      } catch (err) {
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category, searchQuery]);

  const handleRating = (recipeId, value) => {
    setUserRatings((prev) => ({
      ...prev,
      [recipeId]: value,
    }));
  };

  const submitRating = async (recipeId) => {
    if (!user) {
      alert("Please login to rate this recipe");
      navigate("/login");
      return;
    }
    try {
      await api.post(`/api/recipes/${recipeId}/rating`, {
        value: userRatings[recipeId],
      });
      alert("Rating submitted");
    } catch (err) {
      alert("Failed to submit rating");
    }
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <h3>Loading recipes...</h3>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-5">
        <h3>Error: {error}</h3>
      </div>
    );

  if (!recipes.length)
    return (
      <div className="text-center py-5">
        <h3>No recipes found.</h3>
      </div>
    );

  const visibleRecipes = limit ? recipes.slice(0, limit) : recipes;

  return (
    <div className="row row-cols-1 row-cols-md-3 p-2 m-0 g-3 d-flex justify-content-evenly align-items-center">
      {visibleRecipes.map((item) => {
        const {
          _id,
          title,
          image,
          procedure,
          preparationTime,
          createdAt,
          averageRating,
          reviews,
          createdBy,
        } = item;

        const desc = procedure
          ? procedure.length > 120
            ? procedure.slice(0, 120) + "..."
            : procedure
          : "No description";

        const imgSrc =
          image?.image_url ||
          "https://via.placeholder.com/400x250?text=No+Image";

        return (
          <div className="col" key={_id} style={{ width: "350px" }}>
            <div className="card h-100">
              <img
                src={imgSrc}
                className="card-img-top"
                alt={title}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="card-title">{title}</h5>
                  <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
                </div>

                <p className="card-text flex-grow-1">{desc}</p>

                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn"
                    style={{ backgroundColor: "#ef993c", color: "#fff" }}
                    onClick={() => navigate(`/recipeDetails/${_id}`)}
                  >
                    View More
                  </button>
                  <p className="mb-0">
                    <i className="fa-regular fa-clock"></i> :{" "}
                    {preparationTime || "N/A"}
                  </p>
                </div>

                {/* Rating section */}
                <div className="mt-3">
                  <p>
                    ⭐ {averageRating || 0} / 5 ({reviews?.length || 0} Reviews)
                  </p>

                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={
                        star <= (userRatings[_id] || 0)
                          ? "fa-solid fa-star"
                          : "fa-regular fa-star"
                      }
                      style={{ color: "#f2b01e", cursor: "pointer" }}
                      onClick={() => handleRating(_id, star)}
                    ></i>
                  ))}

                  <button
                    className="btn btn-sm ms-2"
                    onClick={() => submitRating(_id)}
                  >
                    Submit
                  </button>
                </div>

                <small className="text-muted mt-auto">
                  Added: {new Date(createdAt).toLocaleDateString()}
                </small>

                <p className="text-end mb-0">
                  - {createdBy?.name || "Unknown Creator"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Recipes;
