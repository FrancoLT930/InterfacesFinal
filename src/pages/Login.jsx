import { useState } from "react";
import { LogoChaskys } from "../components/LogoChaskys";   // ajustá la ruta si es necesario
import { Link, useNavigate } from "react-router-dom";

// ICONOS DE REACT-ICONS (mismos que Register)
import { FiUser, FiLock } from "react-icons/fi";

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user === "admin" && password === "123456") {
      // FORZAMOS DATOS DE ADMIN (para que no haya cruce)
      const adminData = {
        name: "Juan",
        username: "admin",
        type: "Chasky Premium",
        profit: "152.20",
        record: 253,
        totalToday: 32,
        isAdmin: true,
        phone: "987654321",           // <--- TELÉFONO DEL ADMIN
        email: "juan@chaskys.com"     // <--- CORREO DEL ADMIN
      };
      localStorage.setItem("chaskysUser", JSON.stringify(adminData));
      navigate("/home");
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div className="login-page">
      <LogoChaskys descripcion="Delivery app" />

      <form onSubmit={handleSubmit} className="login-form">
        <section className="inputs-form">
          <div className="input-wrapper">
            <FiUser className="icon" />
            <input
              type="text"
              placeholder="Usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <FiLock className="icon" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </section>

        <section className="OlvidoContra">¿Olvidaste tu contraseña?</section>

        <section className="accion-login">
          <button type="submit" className="btn btn-login">
            Iniciar Sesión
          </button>
          <Link to="/register" className="btn btn-create-account">
            Crea una cuenta
          </Link>
        </section>
      </form>
    </div>
  );
};