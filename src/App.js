import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/navegacion/sidebar.js';
import Panel from './components/panelprincipal/panel.js';
import Espacios from './components/espacio/espacio.js';


const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Panel />} />
          <Route path="/espacios" element={<Espacios />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;