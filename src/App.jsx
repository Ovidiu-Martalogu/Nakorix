import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Devices from "./pages/Devices"
import Network from "./pages/Network"

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/network" element={<Network />} />
      </Routes>
    </MainLayout>
  )
}
