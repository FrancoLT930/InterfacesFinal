import { useState } from "react";
import { LogoChaskys } from "../components/LogoChaskys";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validUser = "admin";
    const validPassword = "123456";

    if (user === validUser && password === validPassword) {
      navigate("/home");
    }
  };

  return (
    <>
      <LogoChaskys descripcion={"Delivery app"} />

      <form onSubmit={handleSubmit} className="login-form">
        <section className="inputs-form">
          <input
            type="text"
            name="user"
            id="user"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
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
    </>
  );
};