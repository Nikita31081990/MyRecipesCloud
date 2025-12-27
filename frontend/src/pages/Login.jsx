import { useState, useContext } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { fetchProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  // for Login

  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");

  // for registration
  const [resName, setResName] = useState("");
  const [resEmail, setResEmail] = useState("");
  const [resPassword, setResPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post(
        "/api/user/login",
        {
          email: logEmail,
          password: logPassword,
        },
        { withCredentials: true } // ✅ VERY IMPORTANT
      );

      toast.success(res.data.message || "User login successfully");

      // 🔥 THIS IS THE KEY
      await fetchProfile(); // context user set karega

      navigate("/");
    } catch (error) {
      console.log("error msg=", error);
      toast.error("Something went wrong");
    }
  };

  const handleRegistration = async () => {
    try {
      const res = await api.post("/api/user/register", {
        name: resName,
        email: resEmail,
        password: resPassword,
      });
      // alert(res.data.message);
      toast.success(res.data.message || "Registration completed successfully");
    } catch (error) {
      console.log("error is", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="loginForm d-flex justify-content-center align-items-center vh-100">
      <form className="col-lg-5 col-sm-10 border border-3 p-5 rounded shadow-lg">
        <h2 className="text-center mb-4">
          {isLogin ? "Login Page" : "Registration Page"}
        </h2>
        {isLogin ? (
          <></>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={resName}
                onChange={(e) => setResName(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={isLogin ? logEmail : resEmail}
            onChange={
              isLogin
                ? (e) => setLogEmail(e.target.value)
                : (e) => setResEmail(e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={isLogin ? logPassword : resPassword}
            onChange={
              isLogin
                ? (e) => setLogPassword(e.target.value)
                : (e) => setResPassword(e.target.value)
            }
          />
        </div>

        <button
          type="button"
          className="btn btn-primary w-100 mt-3"
          onClick={isLogin ? handleLogin : handleRegistration}
        >
          {isLogin ? "Login" : "Registration"}
        </button>

        <p className="mt-3 text-center">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? "Register here" : "Login Here"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
