import { Navigate, Route, Routes } from "react-router-dom";
import BarGraph from "./BarGraph";
import PageLayout from "./PageLayout";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}/>
      <Route index element={<Navigate to="bargraph" replace />} />
      <Route path="bargraph" element={<BarGraph />} />
    </Routes>
  )
}

export default App
