import React, { useState } from "react";
import axios from "axios";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios.post("", { email, password })// aqui la ruta de usuario
      .then(response => {
        
      })
      .catch(error => {
        setError(error.response.data.message);
      });
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div className="form-group">
          <label htmlFor="email">
            <i className="fas fa-envelope"></i>
          </label>
          <input type="email" id="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <i className="fas fa-lock"></i>
          </label>
          <input type="password" id="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Iniciar sesión</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Login;
