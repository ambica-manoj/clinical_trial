import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PredictionForm from "./PredictionForm";
import EligiblePatients from "./pages/EligiblePatients";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/predict" element={<PredictionForm />} />
        <Route path="/eligible-patients" element={<EligiblePatients/>}/>
      </Routes>
    </Router>
  );
}

export default App;