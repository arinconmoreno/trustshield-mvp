import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DemoDashboard from "./components/DemoDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/demo" element={<DemoDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
