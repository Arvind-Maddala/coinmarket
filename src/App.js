import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import CoinPage from "./Pages/CoinPage";
import HomePage from "./Pages/HomePage";
import "./App.css";
import { Box, CssBaseline } from "@mui/material";

function App() {
  return (
    <Box sx={{ minHeight: "100vh", boxShadow: "none" }}>
      <Router>
        <CssBaseline />
        <div>
          <Header />
        </div>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/coins/:id" exact element={<CoinPage />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
