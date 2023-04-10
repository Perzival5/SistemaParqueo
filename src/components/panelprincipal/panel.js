import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './panel.css'
const Panel = () => {
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        const obtenerDatos = async () => {
          const resultado = await axios.get('https://proyectoparqueo.000webhostapp.com/public/api/estado');
          setDatos(resultado.data);
        };
        obtenerDatos();
      }, []);
    return (
        <div>
            <div >
                <br />
                <p >Estado del parqueo</p>
            </div>
            <div>
                <table>
                    <tr>
                        <th>Total de espacios</th>
                        <th>Espacios disponibles</th>
                        <th>Espacios ocupados</th>
                        <th>Espacios reservados</th>
                        <th>Espacios deshabilitados</th>
                        <th>Espacios solicitados</th>
                    </tr>
                    <tr>
                        <td>{datos.total_espacios}</td>
                        <td>{datos.espacios_disponibles}</td>
                        <td>{datos.espacios_ocupados}</td>
                        <td>{datos.espacios_reservados}</td>
                        <td>{datos.espacios_deshabilitados}</td>
                        <td>{datos.espacios_solicitados}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default Panel;