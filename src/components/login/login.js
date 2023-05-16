//import React from 'react';
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Form, InputGroup, Button } from 'react-bootstrap';
import "./login.css";
import logo from './../imagenes/logo.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import configData from "../config/config.json";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import RegistrationForm from "../registro/Register.js";
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const URL_LOGIN = configData.LOGIN_API_URL;


const enviarDatos = async (url, datos) => {
  const resp = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(resp);
  const rjson = await resp.json();
  console.log('hola');
  console.log(rjson);

  return rjson;
}


let i = 0;
let j = 0;
let err = "";

export const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [state, setstate] = useState(false);

  const navigate = useNavigate()

  const toggleBtn = () => {
    setstate(prevState => !prevState);
  }

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({

    initialValues: { email: "", password: "" },
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        setSubmitting(false);
      }, 4000);
    },
  })

  const [isValid, setIsValid] = useState(false);

  function ejecutaAlerta() {

    setTimeout(function () { setIsValid(false) }, 4000)
  }

  const handleLogin = async () => {
    setIsValid(false)
    const datos = {
      "correo": values.email,
      "password": values.password
    };

    const respuestaJson = await enviarDatos(URL_LOGIN, datos);
    err = values.email && values.password ? respuestaJson.error : "";

    if (respuestaJson.conectado == true) {
      setIsValid(false)
      console.log('Nombre de usuario:', loginUser.nombre);
      navigate('/navegacion/sidebar.js', { replace: true })
    } else {
      setIsValid(true)
      ejecutaAlerta();
    }
  };
  return (

    <div className='loginPage'>
      <br></br>
      <br></br>
      {err ?
        <Alert className="container d-flex justify-content-center align-items-center" show={isValid} variant="danger">
          <Alert.Heading>
            <FontAwesomeIcon icon={faTriangleExclamation} style={{ color: "#842029" }} />
            {err}
          </Alert.Heading>
        </Alert> : ""}
      <br />
      <Container className="loginForm d-flex flex-column justify-content-center align-items-center">
        <div className='mb-4'>
          <img src={logo} className="rounded-circle" height="120" width="120" left="200"></img>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="col-md-12">
            <Form.Label htmlFor="email" className="form-label textLabel d-flex flex-row align-items-left">Correo</Form.Label>
            <Form.Control
              style={{ fontSize: "17px", color: "black" }}
              className={errors.email && touched.email && "error"}
              id="email"
              type="email"
              name="email"
              placeholder="Ingresa tu correo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}>
            </Form.Control>
          </Form.Group>
          <Form.Text className="errorMessModal d-flex flex-row justify-content-center" muted>
            {errors.email && touched.email && (
              <div className="input-feedback">{errors.email}</div>
            )}
          </Form.Text>
          <Form.Group className="col-md-12">
            <Form.Label htmlFor="password" className="form-label textLabel d-flex flex-row align-items-left">Contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                style={{ fontSize: "17px", color: "black" }}
                className={errors.password && touched.password && "error"}
                id="password"
                type={state ? "text" : "password"}
                name="password"
                placeholder="Ingresa tu contraseña"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              >
              </Form.Control>
              <Button
                className='button-block'
                variant="light"
                onClick={toggleBtn}
              >
                {state ?
                  <AiOutlineEye align="center" /> : <AiOutlineEyeInvisible align="center" />
                }
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Text className="errorMessModal d-flex flex-row justify-content-center mb-3" muted>
            {errors.password && touched.password && (
              <div className="input-feedback">{errors.password}</div>
            )}
          </Form.Text>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <button
              className="btn btn-success col-4 m-1"
              onClick={handleLogin}
            >
              Ingresar
            </button>
            <br />
            <Link to="/registro">Register</Link>
          </div>
        </Form>
      </Container >
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div >
  );
};

export default Login;
