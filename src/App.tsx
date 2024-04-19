import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <Route index element={<App />} />

      {/* client route */}
      <Routes></Routes>

      {/* admin route */}
      <Routes></Routes>

      <Route path="*" element={<NotFound />} />
    </Router>
  );
};
export default App;
