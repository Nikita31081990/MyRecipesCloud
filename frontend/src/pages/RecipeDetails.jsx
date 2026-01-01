import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

const RecipeDetails = () => {
  const { id } = useParams(); // 👈 URL se id
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/api/recipes/getRecipes/${id}`);

        setRecipe(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <h3 className="text-center my-5">Loading...</h3>;
  if (!recipe) return <h3 className="text-center my-5">Recipe not found</h3>;

  const {
    title,
    image,
    ingredients,
    procedure,
    video,
    preparationTime,
    rating,
    createdAt,
  } = recipe;

  return (
    <div className="container my-5">
      <div className="text-center">
        <h1>{title}</h1>
        <p>Added on {new Date(createdAt).toLocaleDateString()}</p>

        <img
          className="col-sm-5 col-lg-5"
          src={image?.image_url}
          alt={title}

          // style={{ maxWidth: "400px", height: "300px", objectFit: "cover" }}
        />

        <p className="mt-3">
          <strong>Preparation Time:</strong> {preparationTime}
        </p>

        {/* <p>
          <strong>Rating:</strong> {rating || 4}
        </p> */}
      </div>

      <hr />

      <div className="row d-flex justify-content-evenly">
        <div className="col-md-5 shadow p-3 mb-5 bg-body rounded">
          <h3>Ingredients</h3>
          <ul>
            {ingredients?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="col-md-6 shadow p-3 mb-5 bg-body rounded">
          <h3>Procedure</h3>
          <p style={{ whiteSpace: "pre-line" }}>{procedure}</p>
        </div>
      </div>

      {/* {video && (
        <div className="text-center mt-4">
          <iframe
            width="500"
            height="300"
            src={video}
            title={title}
            allowFullScreen
          ></iframe>
        </div>
      )} */}

      <div className="d-flex justify-content-center">
        {recipe.video?.video_url && (
          <video className="videoDesc " controls>
            <source src={recipe.video.video_url} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;

// import React from "react";
// import dhokla from "../imgs/Dhokla.jpg";

// const RecipeDetails = () => {
//   return (
//     <div className="d-flex justify-content-center align-items-center my-5 ">
//       <div className="col-10   ">
//         <div className="d-flex flex-column justify-content-center align-items-center p-4 shadow p-3 mb-3 bg-body rounded">
//           <h1>Dhokla</h1>
//           <p>Recipe by Nikita Nawandar</p>
//           <div>
//             <i className="fa-solid fa-star" style={{ color: "#f2b01e" }}></i>
//             <i className="fa-solid fa-star" style={{ color: "#f2b01e" }}></i>
//             <i className="fa-solid fa-star" style={{ color: "#f2b01e" }}></i>
//             <i
//               className="fa-solid fa-star-half-stroke"
//               style={{ color: "#f2b01e" }}
//             ></i>
//             <i className="fa-regular fa-star" style={{ color: "#f2b01e" }}></i>
//           </div>
//           <img
//             src={dhokla}
//             alt=""
//             style={{ width: "400px", height: "300px" }}
//           />
//         </div>
//         <hr />
//         <div className="d-flex">
//           <div className="col-6 border border-dark">
//             <h3>Ingredients</h3>
//             <p></p>
//             <section className="my-4">
//               <h3 className="h5 mb-3">For the batter</h3>
//               <ul className="list-unstyled ms-3">
//                 <li>
//                   <strong>Gram flour (besan):</strong> 1 cup
//                 </li>
//                 <li>
//                   <strong>Yogurt (dahi/curd):</strong> 1/2 cup
//                 </li>
//                 <li>
//                   <strong>Water:</strong> Approximately 1/2 to 3/4 cup (adjust
//                   to desired consistency)
//                 </li>
//                 <li>
//                   <strong>Ginger-green chili paste:</strong> 1 teaspoon
//                 </li>
//                 <li>
//                   <strong>Turmeric powder:</strong> 1/4 to 1/2 teaspoon
//                 </li>
//                 <li>
//                   <strong>Salt:</strong> To taste
//                 </li>
//                 <li>
//                   <strong>Sugar:</strong> 1 teaspoon
//                 </li>
//                 <li>
//                   <strong>Lemon juice:</strong> 1 tablespoon
//                 </li>
//                 <li>
//                   <strong>Eno fruit salt or baking soda:</strong> 1 teaspoon
//                   (add just before steaming)
//                 </li>
//                 <li>
//                   <strong>Oil:</strong> 1 tablespoon
//                 </li>
//               </ul>

//               <h3 className="h5 mt-4 mb-3">For the tempering (tadka)</h3>
//               <ul className="list-unstyled ms-3">
//                 <li>
//                   <strong>Oil:</strong> 1 tablespoon
//                 </li>
//                 <li>
//                   <strong>Mustard seeds:</strong> 1 teaspoon
//                 </li>
//                 <li>
//                   <strong>Curry leaves:</strong> A few
//                 </li>
//                 <li>
//                   <strong>Green chilies:</strong> 1–2, slit
//                 </li>
//                 <li>
//                   <strong>Water:</strong> 1/4 cup
//                 </li>
//                 <li>
//                   <strong>Sugar:</strong> 1 teaspoon
//                 </li>
//                 <li>
//                   <strong>Salt:</strong> A pinch
//                 </li>
//                 <li>
//                   <strong>Chopped coriander leaves:</strong> For garnish
//                   (optional)
//                 </li>
//                 <li>
//                   <strong>Grated fresh coconut:</strong> For garnish (optional)
//                 </li>
//               </ul>
//             </section>
//           </div>

//           <div className="col-6 border border-dark d-flex justify-content-center align-items-center">
//             <div className="procedure">
//               <h3>Procedure to Make Dhokla</h3>

//               {/* Step 1 */}
//               <h4>Step 1: Prepare the Batter</h4>
//               <ul>
//                 <li>Mix besan, curd, and water to make a smooth batter.</li>
//                 <li>Whisk for 2–3 minutes until light.</li>
//                 <li>
//                   Add ginger-chili paste, turmeric, salt, sugar, and lemon
//                   juice.
//                 </li>
//                 <li>Rest the batter for 10–15 minutes.</li>
//               </ul>

//               {/* Step 2 */}
//               <h4>Step 2: Prepare the Steamer</h4>
//               <ul>
//                 <li>Heat water in a steamer or cooker.</li>
//                 <li>Grease a dhokla plate with oil.</li>
//               </ul>

//               {/* Step 3 */}
//               <h4>Step 3: Activate the Batter</h4>
//               <ul>
//                 <li>Add 1 tsp Eno or baking soda into batter.</li>
//                 <li>Add 1–2 tbsp water to activate Eno.</li>
//                 <li>Batter will become light and bubbly.</li>
//                 <li>Immediately pour into greased plate.</li>
//               </ul>

//               {/* Step 4 */}
//               <h4>Step 4: Steam the Dhokla</h4>
//               <ul>
//                 <li>Steam for 15–18 minutes on medium flame.</li>
//                 <li>Check with toothpick — if clean, dhokla is ready.</li>
//                 <li>Let it cool and cut into squares.</li>
//               </ul>

//               {/* Step 5 */}
//               <h4>Step 5: Prepare the Tempering (Tadka)</h4>
//               <ul>
//                 <li>Heat 1 tbsp oil in a small pan.</li>
//                 <li>Add mustard seeds, curry leaves, and green chilies.</li>
//                 <li>Add 1/4 cup water, sugar, and a pinch of salt.</li>
//                 <li>Bring to a quick boil.</li>
//               </ul>

//               {/* Step 6 */}
//               <h4>Step 6: Add Tadka on Dhokla</h4>
//               <ul>
//                 <li>Pour hot tadka evenly on dhokla pieces.</li>
//                 <li>Garnish with coriander and coconut (optional).</li>
//               </ul>

//               {/* Step 7 */}
//               <h4>Step 7: Serve</h4>
//               <ul>
//                 <li>Serve warm with green chutney.</li>
//                 <li>Best served fresh or at room temperature.</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="d-flex justify-content-center my-3">
//           <div className="video-wrapper  ">
//             <iframe
//               src="https://www.youtube.com/embed/ER2kvBwjEXc?rel=0"
//               title="Dhokla Video"
//               width="500px"
//               height="350px"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetails;
