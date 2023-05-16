import React from 'react';
import { FaTaxi, FaGripHorizontal } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

//falta obtener el rol de usuario despues de iniciar sesion 

const Sidebar = ({ children, userRole }) => {
  const menuItems = [
    {
      path: '/',
      name: 'Panel Principal',
      icon: <FaTaxi />,
    },
    {
      path: '/espacios',
      name: 'Espacios',
      icon: <FaGripHorizontal />,
    },
    {
      path: '/login',
      name: 'Iniciar Sesión',
      icon: <FaGripHorizontal />,
    },
    {
      path: '/acceso',
      name: 'Accesos',
      role: [1], // Mostrar solo para rol 1
    },
    {
      path: '/cliente',
      name: 'Clientes',
      role: [1], // Mostrar solo para rol 1
    },
    {
      path: '/cobro',
      name: 'Cobros',
      role: [1], // Mostrar solo para rol 1
    },
    {
      path: '/deuda',
      name: 'Deudas',
      role: [1], // Mostrar solo para rol 1
    },
    {
      path: '/guardia',
      name: 'Guardias',
      role: [1], // Mostrar solo para rol 1
    },
    {
      path: '/reclamo',
      name: 'Reclamos',
      role: [1], // Mostrar solo para rol 1
    },
    {
      path: '/reporte',
      name: 'Reportes',
      role: [1], // Mostrar solo para rol 1
    },
    {
      path: '/vehiculo',
      name: 'Vehiculos',
      role: [1], // Mostrar solo para rol 1
    },
  ];

          //rol 1 = administrador
          //rol 2 = guardia 
          //rol 3 = cliente 

  const filteredMenuItems = menuItems.filter((item) => {
    userRole=2; //solo de prueba ctm
    if (!userRole) {
      return item.path === '/login';
    } else if (userRole === 1) {
      return true;
    } else if (userRole === 2) {
      return item.path === '/' || item.path === '/espacios';
    } else if (userRole === 3) {
      return item.path === '/espacios';
    } else {
      // Otros roles no tienen acceso a ninguna ruta
      return false;
    }
  });

  return (
    <div className="container">
      <div className="sidebar">
        <div className="top_section"></div>
        {filteredMenuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
