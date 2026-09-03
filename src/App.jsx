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
import BookingPage from "./pages/BookingPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import BookingPageDetail from "./pages/BookingPageDetail";
import GuestRoute from "./routes/GuestRoute";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBooking from "./pages/admin/AdminBooking";
import AdminServices from "./pages/admin/AdminServices";
import AdminUsers from "./pages/admin/AdminUsers";
import AuthCallbackPage from "./pages/AuthCallbackPage";

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
              <Route path="/services" element={<ServicePage />} />
              <Route path="/services/:id" element={<ServiceDetailPage />} />

              <Route element={<GuestRoute />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/services/:id/book" element={<BookingPage />} />
                <Route path="/bookings/:id" element={<BookingPageDetail />} />
              </Route>

              {/* admin route */}
              <Route
                path="/admin"
                element={<ProtectedRoute isAdminOnly={true} />}
              >
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="bookings" element={<AdminBooking />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>
              </Route>
            </Routes>
          </HelmetProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
