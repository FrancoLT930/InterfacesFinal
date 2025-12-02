import { useState } from "react";
import { LogoChaskys } from "../components/LogoChaskys";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

// Iconos
import { FiUser, FiCreditCard, FiPhone, FiMail, FiLock } from "react-icons/fi";

export const Register = () => {
  const [step, setStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  // Paso 1
  const [contact, setContact] = useState({ name: "", dni: "", phone: "", email: "" });
  // Paso 2
  const [selfieBase64, setSelfieBase64] = useState(null);
  const [dniFrontBase64, setDniFrontBase64] = useState(null);
  const [transport, setTransport] = useState("");
  // Paso 3
  const [credentials, setCredentials] = useState({ username: "", password: "", confirmPassword: "" });

  const nextStep = () => setStep(step + 1);

  const fileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
    } else {
      // GUARDAR TODO EN LOCALSTORAGE
      const userData = {
        ...contact,
        transport,
        selfieBase64,
        dniFrontBase64,
        ...credentials,
        registeredAt: new Date().toISOString(),
      };

      localStorage.setItem("chaskysUser", JSON.stringify(userData));
      setShowSuccessModal(true);
    }
  };

  const titleText =
    step === 1 ? "Registro - Paso 1 de 3: Contacto" :
    step === 2 ? "Registro - Paso 2 de 3: Validación" :
                 "Registro - Paso 3 de 3: Credenciales";

  return (
    <div className="register-wrapper">
      <LogoChaskys descripcion={titleText} />

      <form onSubmit={handleSubmit} className="register-form">

        {/* =================== PASO 1 =================== */}
        {step === 1 && (
          <div className="form-body">
            <div className="input-wrapper">
              <FiUser className="icon" />
              <input type="text" placeholder="Nombre Completo" required
                value={contact.name} onChange={(e) => setContact({...contact, name: e.target.value})} />
            </div>
            <div className="input-wrapper">
              <FiCreditCard className="icon" />
              <input type="text" placeholder="DNI o CE" required
                value={contact.dni} onChange={(e) => setContact({...contact, dni: e.target.value})} />
            </div>
            <div className="input-wrapper">
              <FiPhone className="icon" />
              <input type="tel" placeholder="Teléfono" required
                value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} />
            </div>
            <div className="input-wrapper">
              <FiMail className="icon" />
              <input type="email" placeholder="Correo" required
                value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} />
            </div>
          </div>
        )}

        {/* =================== PASO 2 =================== */}
        {step === 2 && (
          <div className="validation-step">
            <div className="transport-select">
              <select 
                value={transport} 
                onChange={(e) => setTransport(e.target.value)} 
                required
              >
                <option value="" disabled>Medio de Transporte</option>
                <option value="bicicleta">Bicicleta</option>
                <option value="moto">Moto</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <label className="validation-row">
              <div className={`status-dot ${selfieBase64 ? 'uploaded' : ''}`}></div>
              <span>Toma selfie</span>
              <span className="arrow-right">›</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    fileToBase64(e.target.files[0], setSelfieBase64);
                  }
                }} 
              />
            </label>

            <label className="validation-row">
              <div className={`status-dot ${dniFrontBase64 ? 'uploaded' : ''}`}></div>
              <span>Subir foto DNI</span>
              <span className="arrow-right">›</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    fileToBase64(e.target.files[0], setDniFrontBase64);
                  }
                }} 
              />
            </label>
          </div>
        )}

        {/* =================== PASO 3 =================== */}
        {step === 3 && (
          <div className="form-body">
            <div className="input-wrapper">
              <FiUser className="icon" />
              <input type="text" placeholder="Usuario" required
                value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})} />
            </div>
            <div className="input-wrapper">
              <FiLock className="icon" />
              <input type="password" placeholder="Contraseña" required
                value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
            </div>
            <div className="input-wrapper">
              <FiLock className="icon" />
              <input type="password" placeholder="Repetir contraseña" required
                value={credentials.confirmPassword} onChange={(e) => setCredentials({...credentials, confirmPassword: e.target.value})} />
            </div>
          </div>
        )}

        {/* =================== FOOTER =================== */}
        <div className="accion-register">
          <button type="submit" className="btn btn-continue-register">
            {step === 3 ? "Crear cuenta" : "Continuar"}
          </button>
          <Link to="/login" className="login-link">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
        </div>
      </form>

      {/* =================== MODAL DE ÉXITO =================== */}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-check">✓</div>
            <h2>¡Cuenta creada con éxito!</h2>
            <button 
              className="btn btn-continue-register"
              onClick={() => navigate("/home")}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};