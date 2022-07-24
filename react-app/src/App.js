import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import Hoodie_f from "./pages/Hoodie_f";
import Mobile from "./pages/Mobile";
import Fridge from "./pages/Fridge";
import Tv from "./pages/Tv";
import Laptop from "./pages/Laptop";
import WashingMachine from "./pages/WashingMachine";
import Microwave from "./pages/Microwave";
import Women1 from "./pages/Women1";
import Women2 from "./pages/Women2";
import Men1 from "./pages/Men1";
import Men2 from "./pages/Men2";
import Women3 from "./pages/Women3";
import Dumbel from "./pages/Dumbel";
import Treadmill from "./pages/Treadmill";
import Skill from "./pages/Skill";
import Extension from "./pages/Extension";
import Cycle from "./pages/Cycle";
import Vball from "./pages/Vball";
import Bball from "./pages/Bball";
import Skateboard from "./pages/Skateboard";
import Bench from "./pages/Bench";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/hoodies" element={<Hoodie_f />} />
        <Route exact path="/mobile" element={<Mobile />} />
        <Route exact path="/fridge" element={<Fridge />} />
        <Route exact path="/tv" element={<Tv />} />
        <Route exact path="/laptop" element={<Laptop />} />
        <Route exact path="/wm" element={<WashingMachine />} />
        <Route exact path="/microwave" element={<Microwave />} />
        <Route exact path="/women1" element={<Women1 />} />
        <Route exact path="/women2" element={<Women2 />} />
        <Route exact path="/men1" element={<Men1 />} />
        <Route exact path="/men2" element={<Men2 />} />
        <Route exact path="/women3" element={<Women3 />} />
        <Route exact path="/dumbel" element={<Dumbel />} />
        <Route exact path="/treadmill" element={<Treadmill />} />
        <Route exact path="/skilltool" element={<Skill />} />
        <Route exact path="/hyperextension" element={<Extension />} />
        <Route exact path="/cycle" element={<Cycle />} />
        <Route exact path="/vball" element={<Vball />} />
        <Route exact path="/bball" element={<Bball />} />
        <Route exact path="/skateboard" element={<Skateboard />} />
        <Route exact path="/gymbench" element={<Bench />} />
      </Routes>
    </Router>
  );
}

export default App;
