import { useState } from "react";
import { LogoChaskys } from "../components/LogoChaskys";
import { Link, useNavigate } from "react-router-dom";

// ICONOS
import { FiUser, FiLock } from "react-icons/fi";

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // 1. si es admin con credenciales fijas
    if (user === "admin" && password === "123456") {
      const adminData = {
        name: "Juan",
        username: "admin",
        type: "Chasky Premium",
        profit: "152.20",
        record: 253,
        totalToday: 32,
        isAdmin: true,
        phone: "987654321",
        email: "juan@chaskys.com",
        password: "123456"
      };
      localStorage.setItem("chaskysUser", JSON.stringify(adminData));
      navigate("/home");
      return;
    }

    // 2. cuando sea un usuario registrado
    const savedUser = localStorage.getItem("chaskysUser");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData.username === user && userData.password === password) {
        navigate("/home");
        return;
      }
    }

    setError("Usuario o contraseña incorrectos");
  };

  return (
    <div className="login-page">
      <LogoChaskys descripcion="Delivery app" />

      <form onSubmit={handleSubmit} className="login-form">
        <section className="inputs-form">
          <div className="input-wrapper">
            <FiUser className="icon-login" />
            <input
              type="text"
              placeholder="Usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <FiLock className="icon-login" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </section>

        {/* MENSAJE DE ERROR */}
        {error && <p className="error-message">{error}</p>}

        <section 
          className="OlvidoContra" 
          onClick={() => navigate("/recover-account")}
          style={{ cursor: "pointer" }} 
        >
          ¿Olvidaste tu contraseña?
        </section>

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