import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Devices from "./pages/Devices"
import Network from "./pages/Network"

import Wifi from "./pages/Wifi"
import Bluetooth from "./pages/Bluetooth"

import SDR from "./pages/SDR"
import Logs from "./pages/Logs"
import Settings from "./pages/Settings"


export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/network" element={<Network />} />
        <Route path="/wifi" element={<Wifi />} />
        <Route path="/bluetooth" element={<Bluetooth />} />
        <Route path="/sdr" element={<SDR />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </MainLayout>
  )
}
