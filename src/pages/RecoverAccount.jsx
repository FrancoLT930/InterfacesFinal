import { useNavigate } from "react-router-dom";
// Iconos
import { HiIdentification } from "react-icons/hi";
import { MdWarningAmber } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

import "../styles/RecoverAccount.css";

export const RecoverAccount = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/recover-dni"); 
  };

  return (
    <>
      <button
        className="btn-back-arrow"
        onClick={() => navigate("/login")}
      >
        <IoArrowBack size={28} />
      </button>

      <section className="recover-container">
        <h2>Recupera tu cuenta</h2>
        <p className="recover-subtitle">
          Para poder recuperar tu cuenta te solicitaremos lo siguiente:
        </p>

        <div className="info-box">
          <div className="info-icon">
            <HiIdentification size={44} />
          </div>
          <div className="info-text">
            <strong>Información relacionada a tu cuenta</strong>
            <ul className="info-list">
              <li>Número de DNI</li>
              <li>Correo Electrónico</li>
              <li>Celular</li>
            </ul>
          </div>
        </div>

        <div className="warning-box">
          <MdWarningAmber size={64} className="warning-icon" />
          <p>
            <h3>¿Este flujo es válido para ti?</h3>
            <br />
            Este flujo solo es válido para usuarios que tienen acceso al correo y número telefónico que se registraron en Chaskys.
            Si no tienes acceso a ninguno, comunícate mediante el correo <b>chaskysoporte@gmail.com</b>
          </p>
        </div>

        <div className="bottom-white-section">
          <button
            className="btn-continue"
            onClick={() => navigate("/recover-dni")}
          >
            Continuar
          </button>
        </div>
      </section>
    </>
  );
};