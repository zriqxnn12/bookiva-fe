import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/AuthService";
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
        navigate("/");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed");
    }
  };

  const login = async (email, password) => {
    try {
      const result = await loginUser(email, password);

      if (result.message === "login success") {
        setUser(result.data.user);
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        setIsAuthenticated(true);
        toast.success("Login success!");
        navigate("/");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken("");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
