import { useNavigate } from "react-router-dom";

import "../styles/RecoverSuccess.css";

export const RecoverSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="recover-container success">
        <div className="success-modal">
          <div className="success-check">✓</div>
          <h3>¡Cuenta recuperada con éxito!</h3>
        </div>
        <button className="btn-continue" onClick={() => navigate("/login")}>
          Continuar
        </button>
      </section>
    </>
  );
};