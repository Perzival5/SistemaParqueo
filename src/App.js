import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
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
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Panel />} />
          <Route path="/espacios" element={<Espacios />} />
          <Route path="/login" element={<Login />} />
          <Route path='/acceso' element={<Acceso />}/>
          <Route path='/cliente' element={<Cliente />}/>
          <Route path='/cobro' element={<Cobro />}/>
          <Route path='/deuda' element={<Deuda />}/>
          <Route path='/guardia' element={<Guardia />}/>
          <Route path='/reclamo' element={<Reclamo />}/>
          <Route path='/reporte' element={<Reporte />}/>
          <Route path='/vehiculo' element={<Vehiculo />}/>
        </Routes>
        <Routes>
        <Route path='/registro' element={<Register />} />
        </Routes>
        <Routes>
        <Route path="/login" element={<Login />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
    
  );
};

export default App;