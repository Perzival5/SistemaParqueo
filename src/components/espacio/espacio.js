import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';
import './espacio.css'
import axios from 'axios';
import configData from "../config/config.json";

const URL_ESPACIO = configData.VERESPACIOS_API_URL;
const URL_ACTUALIZAR = configData.ACTUALIZARESPACIO_API_URL;


function mostrarModal() {
  document.getElementById("miModal").style.display = "block";
}

function cerrarModal() {
  document.getElementById("miModal").style.display = "none";
}

const Espacios = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [ci, setCI] = useState('');
  const [rol, setRol] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipo, setTipo] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  const [Modal2, setModal2] = useState(false);
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [espacios, setEspacios] = useState([]);
  const [selectedDivId, setSelectedDivId] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const cerrarModal2 = () => {
    setModal2(false);
  };

  const abrirModal2 = () => {
    setModal2(true);
  };

  const isFutureDate = (date) => {
    const currentDate = new Date();
    return date > currentDate;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (isFutureDate(date)) {
        return 'future-date';
      } else if (date.toDateString() === new Date().toDateString()) {
        return 'current-date';
      }
    }
  };

  const handleDateClick = (value) => {
    if (isFutureDate(value) || value.toDateString() === new Date().toDateString()) {
      setSelectedDate(value);
    }
  };

 useEffect(() => {
  fetch(URL_ESPACIO)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setEspacios(data);
    })
    .catch(error => console.error(error));
}, []);

  const handleDivClick = (event) => {
    const idEspacio = event.target.id;
   setSelectedDivId(idEspacio);
   axios.post(URL_ACTUALIZAR, {
     estado: 'reservado',
     id: idEspacio,
   })

   .then(response => {
    console.log(response);
    //setSelectedDivState('reservado');
   })
   .catch(error => {
    console.log(error);
   });
   console.log(idEspacio);
   mostrarModal();
  }

  const enviarDatos = (e) => {
    e.preventDefault();
    //aqui falta ruta para enviar los datos
  }

  return (
    <body>
      <div id="miModal" class="modal" >
        <span class="cerrar" onClick={cerrarModal}>&times;</span>
        <p6>Espacio: {selectedDivId}</p6> <br /><br />
        <br />
        <div>
          <Calendar onChange={onChange} value={value} tileClassName={tileClassName} onClickDay={handleDateClick} />
          {selectedDate && (
            <div className="modal1">
              <h2>Reservar para: {selectedDate.toLocaleDateString()}</h2>
              <button onClick={abrirModal2} >Reservar</button>
              {Modal2 && (
                <div className="modal2">
                  <button type="button" className="cerrar" onClick={cerrarModal2}>&times;</button>
                  <div>
                    <form className="formulario" onSubmit={enviarDatos}>
                      <h2>Reservar</h2>
                      {/* <label htmlFor="nombre">Nombre:</label> */}
                      <input type="text" id="nombre" placeholder="Nombres" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

                      {/* <label htmlFor="apellidos">Apellidos:</label> */}
                      <input type="text" id="apellidos" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />

                      {/* <label htmlFor="ci">CI:</label> */}
                      <input type="text" id="ci" placeholder="CI" value={ci} onChange={(e) => setCI(e.target.value)} required />

                      {/* <label htmlFor="rol">Rol:</label> */}
                      <input type="text" id="rol" placeholder="Rol" value={rol} onChange={(e) => setRol(e.target.value)} required />

                      {/* <label htmlFor="celular">Celular:</label> */}
                      <input type="text" id="celular" placeholder="Celular" value={celular} onChange={(e) => setCelular(e.target.value)} required />

                      {/* <label htmlFor="correo">Correo:</label> */}
                      <input type="email" id="correo" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

                      {/* <label htmlFor="placa">Placa:</label> */}
                      <input type="text" id="placa" placeholder="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} required />

                      {/* <label htmlFor="marca">Marca:</label> */}
                      <input type="text" id="marca" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} required />

                      {/* <label htmlFor="modelo">Modelo:</label> */}
                      <input type="text" id="modelo" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />

                      <label htmlFor="tipo">Tipo de auto:</label>
                      <select className="Opciones" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                        <option value="">Seleccionar tipo...</option>
                        <option value="Sedán">Deportivo</option>
                        <option value="SUV">Familiar</option>
                        <option value="Pickup">suzuki</option>
                        <option value="Deportivo">otro</option>
                      </select>
                      <label>hora inicio:</label>
                      <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        minDate={new Date()}
                        minTime={new Date().getHours() + ":" + new Date().getMinutes()}
                        maxTime="23:59"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                      <br />
                      <label>hora fin:</label>
                      <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        minDate={startDate}
                        minTime={new Date().getHours() + ":" + new Date().getMinutes()}
                        maxTime="23:59"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                      <button type="submit">Reservar</button>
                    </form>
                  </div>
                </div>
              )}
              <br />


              <button onClick={() => setSelectedDate(null)}>Cerrar</button>
            </div>
          )}
        </div>
        <br />
      </div>
      <div >
        <br />
        <p >Estado del parqueo</p>
      </div>
      <div className='container1' >
        <div className='container2'></div>
        <p1>Espacio libre</p1>
        <div className='container3'></div>
        <p2>Espacio ocupado</p2>
        <div className='container4'></div>
        <p3>Espacio reservado</p3>
        <div className='container5'></div>
        <p4>Espacio deshabilitado</p4>
        <div className='container6'></div>
        <p5>Espacio solicitado</p5>
      </div>
      <br />
      <br />
      <br />

      <div class="grid-container1">
        <div>A</div>
        <div>B</div>
        <div>C</div>
        <div>D</div>
        <div>E</div>
        <div>F</div>
        <div>G</div>
        <div>H</div>
        <div>I</div>
        <div>J</div>
        <div>K</div>
        <div>L</div>

      </div>
      <div class="grid-container2">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
      </div>

      <div class="grid-container">
        {espacios.map(espacio => (
          <div
            onClick={handleDivClick}
            key={espacio.id_espacio}
            id={espacio.id_espacio}
            data-estado={espacio.estado}
            style={{

              backgroundColor:
                espacio.estado === "libre"
                  ? "#D9D9D9"
                  : espacio.estado === "reservado"
                    ? "#6083A9"
                    : espacio.estado === "ocupado"
                      ? "#EC1C24"
                      : espacio.estado === "deshabilitado"
                        ? "#000000"
                        : espacio.estado === "solicitado"
                          ? "#7becda"
                          : "#D9D9D9"
            }}
          >
          </div>
        ))}
      </div>
    </body>

  );
};

export default Espacios;
