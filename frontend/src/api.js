import axios from "axios";

// Use environment variable (best practice)
const BASE_URL =
  import.meta.env.VITE_API_URL || "https://myrecipescloud.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // if your backend needs cookies/auth
});

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:4000",
//   withCredentials: true,
// });

// export default api;
