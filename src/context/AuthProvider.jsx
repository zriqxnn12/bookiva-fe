import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/AuthService";
import toast from "react-hot-toast";

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const register = async (user) => {
    try {
      const result = await registerUser(user);

      if (result.message === "Register success") {
        setUser(result.data.user);
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        setIsAuthenticated(true);
        toast.success("Register success!");
        navigate("/dashboard");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const login = async (user) => {};

  const logout = async () => {};

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
