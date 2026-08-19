import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider";
import Dashboard from "./pages/Dashboard";
import ServicePage from "./pages/ServicePage";
import ServiceDetailPage from "./pages/ServiceDetailPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "12px",
                fontFamily: "Sora, sans-serif",
                fontSize: "14px",
              },
            }}
          />
          <HelmetProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/services" element={<ServicePage />} />
              <Route path="/services/:id" element={<ServiceDetailPage />} />
            </Routes>
          </HelmetProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
