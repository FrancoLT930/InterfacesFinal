import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdWarningAmber } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

import "../styles/RecoverPhone.css";

export const RecoverPhone = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [showCode, setShowCode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); // ← AQUÍ ESTÁ

  const navigate = useNavigate();

  const handleSend = () => {
    if (phone.length === 9) {
      setShowCode(true);
    } else {
      alert("Ingresa un número válido de 9 dígitos");
    }
  };

  const handleCodeChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handleContinue = () => {
    if (code.join("").length === 6) {
      navigate("/recover-success");
    } else {
      alert("Ingresa el código completo de 6 dígitos");
    }
  };

  // REENVIAR CÓDIGO + AUTOCOMPLETE + TOAST CORRECTO
  const handleResend = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(newCode.split("")); // ← autocompleta
    setToastMessage("¡Código reenviado!"); // ← TU MENSAJE
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <button className="btn-back-arrow" onClick={() => navigate(-1)}>
        <IoArrowBack size={28} />
      </button>

      <section className="recover-container">
        <h2>Identificación de tu cuenta</h2>
        <p className="recover-subtitle">
          Ingresa tu número celular para poder enviarte tu código de recuperación.
        </p>

        <div className="input-group2">
          <input
            type="text"
            placeholder="Número de celular"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
            maxLength="9"
            disabled={showCode}
          />
          {!showCode && (
            <button className="btn-send" onClick={handleSend}>
              ENVIAR
            </button>
          )}
        </div>

        {showCode && (
          <>
            <p className="code-sent-text">
              Coloca el código que te acabamos de mandar por SMS
            </p>

            <div className="code-inputs">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={code[index]}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="code-digit"
                />
              ))}
            </div>

            <span className="resend-link" onClick={handleResend}>
              ¿Aún no te llegó el código? Haz clic para reenviarlo.
            </span>
          </>
        )}

        <div className="warning-box">
          <MdWarningAmber size={64} className="warning-icon" />
          <p>
            <strong>¡Recuerda!</strong>
            <br />
            Si no tienes acceso a tu correo o número telefónico, debes comunicarte mediante correo electrónico.
            Escríbenos a <b>chaskysoporte@gmail.com</b>
          </p>
        </div>

        {/* TOAST CON TU MENSAJE */}
        {showToast && (
          <div className="call-toast2">
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="bottom-white-section">
          <button className="btn-continue" onClick={handleContinue}>
            Continuar
          </button>
        </div>
      </section>
    </>
  );
};