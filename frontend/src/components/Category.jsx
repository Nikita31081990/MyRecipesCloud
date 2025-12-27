import React, { useState } from "react";
import breakfast from "../imgs/breakfast.jpg";
import lunch from "../imgs/lunch.jpg";
import dinner from "../imgs/dinner.jpg";
import snacks from "../imgs/snacks.jpg";
import { useNavigate } from "react-router-dom";

const categories = [
  { title: "Breakfast", img: breakfast },
  { title: "Lunch", img: lunch },
  { title: "Dinner", img: dinner },
  { title: "Snacks", img: snacks },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="pt-3 text-center">Category</h1>

      <div className="row row-cols-1 row-cols-md-4 g-4 m-2">
        {categories.map((item, index) => (
          <div className="col" key={index}>
            <div
              className="card h-100 shadow-lg"
              onClick={() => navigate(`/${item.title.toLowerCase()}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="card-img-top"
                style={{ height: "200px", width: "100%" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

// import React from "react";
// import breakfast from "../imgs/breakfast.jpg";
// import lunch from "../imgs/lunch.jpg";
// import dinner from "../imgs/dinner.jpg";
// import snacks from "../imgs/snacks.jpg";

// const Category = () => {
//   return (
//     <div>
//       <h1 className=" pt-3 text-center">Category</h1>
//       <div class="row row-cols-1 row-cols-md-4 g-4 m-2">
//         <div class="col">
//           <div class="card h-100 ">
//             <img
//               src={breakfast}
//               class="card-img-top"
//               alt="..."
//               style={{ height: "200px", width: "100%" }}
//             />
//             <div class="card-body">
//               <h5 class="card-title">Breakfast</h5>
//             </div>
//           </div>
//         </div>
//         <div class="col">
//           <div class="card h-100 shadow-lg">
//             <img
//               src={lunch}
//               class="card-img-top"
//               alt="..."
//               style={{ height: "200px", width: "100%" }}
//             />
//             <div class="card-body">
//               <h5 class="card-title">Lunch</h5>
//             </div>
//           </div>
//         </div>
//         <div class="col">
//           <div class="card h-100 shadow-lg">
//             <img
//               src={dinner}
//               class="card-img-top"
//               alt="..."
//               style={{ height: "200px", width: "100%" }}
//             />
//             <div class="card-body">
//               <h5 class="card-title">Dinner</h5>
//             </div>
//           </div>
//         </div>
//         <div class="col">
//           <div class="card h-100 shadow-lg">
//             <img
//               src={snacks}
//               class="card-img-top"
//               alt="..."
//               style={{ height: "200px", width: "100%" }}
//             />
//             <div class="card-body">
//               <h5 class="card-title">Snacks</h5>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Category;
