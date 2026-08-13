import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <HelmetProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
