import { LogoChaskys } from "../components/LogoChaskys";
import { Link } from "react-router";
import { useState } from "react";

import "../styles/Register.css";

export const Register = () => {
  const [form, setForm] = useState({
    name: "",
    dni: "",
    phone: "",
    email: ""
    
  });

  return (
    <>
      <LogoChaskys descripcion={"Registro - Paso 1 de 3: Contacto"} />
      <section id="form">
        <form action="register-user" method="post">
          <div className="form-body">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nombre Completo"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              name="dni"
              id="dni"
              placeholder="DNI"
              value={form.dni}
              onChange={(e) => setForm({ ...form, dni: e.target.value })}
            />
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Teléfono"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Correo"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            
          </div>

          <div className="accion-register">
            <button type="submit" className="btn btn-continue-register">
              Continuar
            </button>
            <a href="">¿Ya tienes una cuenta? Inicia Sesión</a>
          </div>
        </form>
      </section>
    </>
  );
};
