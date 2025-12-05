import { useNavigate } from "react-router-dom";
import { HeaderHome } from "../components/home/Header";

import "../styles/RecoverSuccess.css";

export const RecoverSuccess = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // === FORZAMOS AL ADMIN ===
    const adminData = {
      name: "Juan",
      username: "admin",
      type: "Chasky Premium",
      profit: "152.20",
      record: 253,
      totalToday: 32,
      isAdmin: true,
      phone: "987654321",
      email: "juan@chaskys.com"
    };

    localStorage.setItem("chaskysUser", JSON.stringify(adminData));
    navigate("/home");
  };

  return (
    <>
      <HeaderHome showBack={true} />

      <section className="recover-container success">
        <div className="success-modal2">
          <div className="success-check">✓</div>
          <h3>¡Cuenta recuperada con éxito!</h3>
        </div>

        <div className="bottom-white-section">
          <button className="btn-continue" onClick={handleContinue}>
            Continuar
          </button>
        </div>
      </section>
    </>
  );
};