import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <HelmetProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
