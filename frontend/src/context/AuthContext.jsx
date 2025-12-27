import { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/user/profile", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = async () => {
    try {
      await api.post("/api/user/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
