import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <HelmetProvider>
        <HomePage />
      </HelmetProvider>
    </>
  );
}

export default App;
