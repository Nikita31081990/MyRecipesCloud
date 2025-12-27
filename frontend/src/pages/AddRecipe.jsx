import React, { useState } from "react";
import api from "../api"; // axios instance
import { toast } from "react-toastify";

const AddRecipe = () => {
  // ---------------- STATES ----------------
  const [title, setTitle] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [procedure, setProcedure] = useState("");
  const [image, setImage] = useState(null);
  //const [video, setVideo] = useState(""); // ✅ URL string
  const [video, setVideo] = useState(null);

  const [categories, setCategories] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    snacks: false,
  });

  const [loading, setLoading] = useState(false);

  // ------------ HANDLE CATEGORY CHECKBOXES ------------
  const handleCategoryChange = (e) => {
    setCategories({
      ...categories,
      [e.target.id]: e.target.checked,
    });
  };

  // ---------------- SUBMIT FUNCTION ----------------
  const handleAddRecipe = async () => {
    try {
      // -------- BASIC VALIDATION --------
      if (!title || !prepTime || !ingredients || !procedure) {
        alert("Please fill all required fields");
        return;
      }

      if (!image) {
        alert("Please select an image");
        return;
      }

      // get selected category
      const selectedCategories = Object.keys(categories).filter(
        (key) => categories[key]
      );

      if (selectedCategories.length === 0) {
        alert("Please select at least one category");
        return;
      }

      setLoading(true);

      // -------- FORM DATA --------
      const formData = new FormData();
      formData.append("title", title);
      formData.append("preparationTime", prepTime);
      formData.append("ingredients", ingredients);
      formData.append("procedure", procedure);
      formData.append("category", selectedCategories[0]); // ✅ backend compatible
      formData.append("image", image);

      if (video) {
        formData.append("video", video); // optional
      }

      // -------- API CALL --------
      const res = await api.post("/api/recipes/createRecipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message || "Recipes added successfully");
      // alert(res.data.message || "Recipe added successfully ✅");

      // -------- RESET FORM --------
      setTitle("");
      setPrepTime("");
      setIngredients("");
      setProcedure("");
      setImage(null);
      setVideo("");
      setCategories({
        breakfast: false,
        lunch: false,
        dinner: false,
        snacks: false,
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center p-5">
      <div className="row col-6 d-flex flex-column ">
        {/* Title */}
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Image */}
        <label className="form-label">Image</label>
        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* Preparation Time */}
        <label className="form-label">Preparation Time (minutes)</label>
        <input
          type="text"
          className="form-control mb-3"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          placeholder="e.g., 20 min or 1 hr 20 min"
        />

        {/* <input
          type="text"
          name="preparationTime"
          value={preparationTime}
          onChange={(e) => setPreparationTime(e.target.value)}
          placeholder="e.g., 20 min or 1 hr 20 min"
        /> */}

        {/* Ingredients */}
        <label className="form-label">Ingredients (comma separated)</label>
        <textarea
          className="form-control mb-3"
          style={{ height: "100px" }}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        {/* Procedure */}
        <label className="form-label">Procedure</label>
        <textarea
          className="form-control mb-3"
          style={{ height: "100px" }}
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
        />

        {/* Video */}
        <label className="form-label">Video (Optional)</label>
        <input
          type="file"
          className="form-control mb-3"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        {/* Image
        <label className="form-label">Image</label>
        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setImage(e.target.files[0])}
        /> */}

        {/* Categories */}
        <div className="d-flex justify-content-between mb-3">
          {["breakfast", "lunch", "dinner", "snacks"].map((cat) => (
            <div className="form-check" key={cat}>
              <input
                className="form-check-input"
                type="checkbox"
                id={cat}
                checked={categories[cat]}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label" htmlFor={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </label>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          className="btn btn-primary mt-3"
          onClick={handleAddRecipe}
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Recipe"}
        </button>
      </div>
    </div>
  );
};

export default AddRecipe;

// import React, { useState } from "react";
// import api from "../api"; // axios instance

// const AddRecipe = () => {
//   // ---------------- STATES ----------------
//   const [title, setTitle] = useState("");
//   const [prepTime, setPrepTime] = useState("");
//   const [ingredients, setIngredients] = useState("");
//   const [procedure, setProcedure] = useState("");
//   const [image, setImage] = useState(null);
//   const [video, setVideo] = useState(null);

//   const [categories, setCategories] = useState({
//     breakfast: false,
//     lunch: false,
//     dinner: false,
//     snacks: false,
//   });

//   const [loading, setLoading] = useState(false);

//   // ------------ HANDLE CATEGORY CHECKBOXES ------------
//   const handleCategoryChange = (e) => {
//     setCategories({
//       ...categories,
//       [e.target.id]: e.target.checked,
//     });
//   };

//   // ---------------- SUBMIT FUNCTION ----------------
//   const handleAddRecipe = async () => {
//     try {
//       setLoading(true);

//       // FormData (important for file upload)
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("preparationTime", prepTime);
//       formData.append("ingredients", ingredients);
//       formData.append("procedure", procedure);

//       // Add files
//       if (image) formData.append("image", image);
//       if (video) formData.append("video", video);

//       // Add selected categories (array me send karne ke liye)
//       const selectedCategories = Object.keys(categories).filter(
//         (key) => categories[key] === true
//       );
//       // formData.append("categories", JSON.stringify(selectedCategories));
//       formData.append("category", JSON.stringify(selectedCategories));

//       // API call
//       const res = await api.post("/api/recipes/createRecipes", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert(res.data.message);

//       // Reset form after success
//       setTitle("");
//       setPrepTime("");
//       setIngredients("");
//       setProcedure("");
//       setImage(null);
//       setVideo(null);
//       setCategories({
//         breakfast: false,
//         lunch: false,
//         dinner: false,
//         snacks: false,
//       });
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to add recipe");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <div className="row col-6 d-flex flex-column">
//           {/* Title */}
//           <label className="form-label">Title</label>
//           <input
//             type="text"
//             className="form-control mb-3"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           {/* Image */}
//           <label className="form-label">Image</label>
//           <div className="input-group mb-3">
//             <input
//               type="file"
//               className="form-control"
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </div>

//           {/* Preparation Time */}
//           <label className="form-label">Preparation Time (minutes)</label>
//           <input
//             type="number"
//             className="form-control mb-3"
//             value={prepTime}
//             onChange={(e) => setPrepTime(e.target.value)}
//           />

//           {/* Ingredients */}
//           <label className="form-label">Ingredients</label>
//           <textarea
//             className="form-control mb-3"
//             style={{ height: "100px" }}
//             value={ingredients}
//             onChange={(e) => setIngredients(e.target.value)}
//           ></textarea>

//           {/* Procedure */}
//           <label className="form-label">Procedure</label>
//           <textarea
//             className="form-control mb-3"
//             style={{ height: "100px" }}
//             value={procedure}
//             onChange={(e) => setProcedure(e.target.value)}
//           ></textarea>

//           {/* Video */}
//           <label className="form-label">Video (Optional)</label>
//           <div className="input-group mb-3">
//             <input
//               type="file"
//               className="form-control"
//               onChange={(e) => setVideo(e.target.files[0])}
//             />
//           </div>

//           {/* Categories */}
//           <div className="d-flex justify-content-between mb-3">
//             {["breakfast", "lunch", "dinner", "snacks"].map((cat) => (
//               <div className="form-check" key={cat}>
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id={cat}
//                   checked={categories[cat]}
//                   onChange={handleCategoryChange}
//                 />
//                 <label className="form-check-label" htmlFor={cat}>
//                   {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                 </label>
//               </div>
//             ))}
//           </div>

//           {/* Submit Button */}
//           <button
//             className="btn btn-primary mt-3"
//             onClick={handleAddRecipe}
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Add Recipe"}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddRecipe;
