import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/AuthService";
import toast from "react-hot-toast";

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      return JSON.parse(localStorageUser);
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );

  const navigate = useNavigate();

  const register = async (user) => {
    try {
      const result = await registerUser(user);

      if (result.message === "Register success") {
        setUser(result.data.user);
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.user));
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
        localStorage.setItem("user", JSON.stringify(result.data.user));
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
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setToken("");
    setUser(null);
    navigate("/login");
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
