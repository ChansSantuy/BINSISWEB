// src/routes/route.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "../pages/homepage"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}
