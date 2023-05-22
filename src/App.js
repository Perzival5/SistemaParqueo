import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/navegacion/sidebar.js';
import Panel from './components/panelprincipal/panel.js';
import Espacios from './components/espacio/espacio.js';
import Login from './components/login/login.js';
import Register from './components/registro/Register.js';
import Acceso from './components/accesos/acceso.js';
import Cliente from './components/clientes/cliente.js';
import Cobro from './components/cobros/cobro.js';
import Deuda from './components/deudas/deuda.js';
import Guardia from './components/guardias/guardia.js';
import Reclamo from './components/reclamos/reclamo.js';
import Reporte from './components/reportes/reporte.js';
import Vehiculo from './components/vehiculos/vehiculo.js'

const App = () => {
  const [userRole, setUserRole] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {userRole !== null ? (
          <Route
            path="/"
            element={
              <Sidebar userRole={userRole}>
                <Routes>
                  <Route path="/" element={<Panel />} />
                  <Route path="/espacios" element={<Espacios />} />
                  <Route path='/acceso' element={<Acceso />} />
                  <Route path='/cliente' element={<Cliente />} />
                  <Route path='/cobro' element={<Cobro />} />
                  <Route path='/deuda' element={<Deuda />} />
                  <Route path='/guardia' element={<Guardia />} />
                  <Route path='/reclamo' element={<Reclamo />} />
                  <Route path='/reporte' element={<Reporte />} />
                  <Route path='/vehiculo' element={<Vehiculo />} />
                </Routes>
              </Sidebar>
            }
          />
        ) : (
          <Route path="/" element={<Login setUserRole={setUserRole} />} />
        )}
        <Route path='/login' element={<Login setUserRole={setUserRole} />} />
        <Route path='/reporte' element={<Reporte setUserRole={setUserRole} />} />
        <Route path='/espacios' element={<Espacios setUserRole={setUserRole} />} />
        <Route path='/' element={<Panel setUserRole={setUserRole} />} />
        <Route path='/registro' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
