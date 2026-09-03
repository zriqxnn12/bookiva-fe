import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { getMe } from "../services/AuthService";

function AuthCallbackPage() {
  const [params] = useSearchParams();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      setAuth({}, token);
      getMe().then((res) => {
        console.log("get me response", res);
        const user = res.message?.user;
        console.log("USER:", user);
        setAuth(user, token);
        toast.success(`Welcome ${user.name.split(" ")[0]}!`);
        navigate("/");
      });
    } else {
      toast.error("Sign in failed");
      navigate("/login");
    }
  }, []);
  return <div>AuthCallbackPage</div>;
}

export default AuthCallbackPage;
