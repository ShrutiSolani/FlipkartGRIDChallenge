import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Index from "./pages/Index";
import Forms from "./pages/Form";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Hoodie_f from "./pages/Hoodie_f";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/hoodies" element={<Hoodie_f />} />
      </Routes>
    </Router>
  );
}

export default App;
