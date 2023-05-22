import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './panel.css'
const Panel = () => {
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        const obtenerDatos = async () => {
          const resultado = await axios.get('http://localhost/proyectoParqueo/detalleParqueo.php');
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
                        <td>{datos.total}</td>
                        <td>{datos.libre}</td>
                        <td>{datos.ocupado}</td>
                        <td>{datos.reservado}</td>
                        <td>{datos.deshabilitado}</td>
                        <td>{datos.solicitado}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default Panel;