import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdWarningAmber } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

import "../styles/RecoverDni.css";

export const RecoverDni = () => {
  const [dni, setDni] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (dni.length === 8) {
      navigate("/recover-phone", { state: { dni } });
    } else {
      alert("Ingresa un DNI válido de 8 dígitos");
    }
  };

  return (
    <>
      {/* FLECHA VOLVER */}
      <button className="btn-back-arrow" onClick={() => navigate(-1)}>
        <IoArrowBack size={28} />
      </button>

      <section className="recover-container">
        <h2>Identificación de tu cuenta</h2>
        <p className="recover-subtitle">
          Ingresa el número de identificación con el que creaste tu cuenta para validar si eres elegible de recuperación.
        </p>

        <div className="input-group">
          <input
            type="text"
            placeholder="Número de documento de identidad"
            value={dni}
            onChange={(e) => setDni(e.target.value.replace(/\D/g, "").slice(0, 8))}
            maxLength="8"
            inputMode="numeric"
          />
        </div>

        <div className="warning-box">
                  <MdWarningAmber size={64} className="warning-icon" />
                  <p>
                    <h3>¡Recuerda!</h3>
                    <br />
                    Si no tienes acceso a tu correo o número telefónico, debes comunicarte mediante correo electrónico. Escríbenos a <b>chaskysoporte@gmail.com</b>
                  </p>
                </div>

        {/* BOTÓN CON FONDO BLANCO ABAJO */}
        <div className="bottom-white-section">
          <button className="btn-continue" onClick={handleContinue}>
            Continuar
          </button>
        </div>
      </section>
    </>
  );
};