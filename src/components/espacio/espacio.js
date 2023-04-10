import React, { useState, useEffect } from "react";
import './espacio.css'


function mostrarModal() {
  document.getElementById("miModal").style.display = "block";
}

function cerrarModal() {
  document.getElementById("miModal").style.display = "none";
}

const Espacios = () => {

  const [espacios, setEspacios] = useState([]);
  const [selectedDivId, setSelectedDivId] = useState(null);
  const [selectedDivState, setSelectedDivState] = useState(null);

  useEffect(() => {
    fetch("https://proyectoparqueo.000webhostapp.com/public/api/espacios")
      .then(response => response.json())
      .then(data => setEspacios(data))
      .catch(error => console.log(error));
  }, []);

  function ManejarCambio(event) {
    const id = event.target.options[event.target.selectedIndex].id;
    setColorSeleccionado(event.target.value);
    console.log(id)
  }
  const [colorSeleccionado, setColorSeleccionado] = useState("");
  const handleDivClick = (event) => {
    setSelectedDivId(event.target.id);
    setSelectedDivState(event.target.getAttribute('data-estado'));
    mostrarModal();
  };
  const handleColorChange = (newColor) => {
    document.getElementById(selectedDivId).style.backgroundColor = newColor;
  };

  const handleButtonClick = () => {
    if (colorSeleccionado === "espacio libre") {
      handleColorChange("#D9D9D9");
    } else if (colorSeleccionado === "espacio ocupado") {
      handleColorChange("#EC1C24");
    } else if (colorSeleccionado === "espacio reservado") {
      handleColorChange("#6083A9");
    } else if (colorSeleccionado === "espacio deshabilitado") {
      handleColorChange("#000000");
    }

  };

  return (
    <body>
      <div id="miModal" class="modal" >
        <span class="cerrar" onClick={cerrarModal}>&times;</span>
        <p6>Espacio: {selectedDivId}</p6> <br /><br />
        <p6>Estado: {selectedDivState}</p6><br /><br />
        <p6>Nuevo Estado:</p6> <br />
        <br />
        <select className="select-dropdown" onChange={ManejarCambio}>seleccionar
          <option selected>Seleccionar</option>
          <option value="espacio libre" id="espaciolibre" >Espacio libre</option>
          <option value="espacio ocupado" id="espacioocupado" >Espacio ocupado</option>
          <option value="espacio reservado" id="espacioreservado" >Espacio reservado</option>
          <option value="espacio deshabilitado" id="espaciodeshabilitado" >Espacio deshabilitado</option>
        </select>
        <br />
        <button className='button' onClick={handleButtonClick}>Guardar</button>
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
