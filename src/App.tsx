import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from '@/pages/Dashboard';
import Performance from '@/pages/Performance'
import Settings from '@/pages/Settings';


function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
