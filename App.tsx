import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ConverterPage } from './pages/ConverterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/convert" element={<ConverterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;