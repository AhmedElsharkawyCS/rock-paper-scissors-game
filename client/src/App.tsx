import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import theme from "./theme"
import { MainLayout } from "./layouts"
import Home from "./pages/Home"
import RPSGame from "./pages/RPSGame"

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/rps' element={<RPSGame />} />
          </Routes>
        </MainLayout>
      </ThemeProvider>
    </BrowserRouter>
  )
}
