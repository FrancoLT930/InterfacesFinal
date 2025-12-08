import { useState } from "react";
import { LogoChaskys } from "../components/LogoChaskys";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

// Iconos
import { FiUser, FiCreditCard, FiPhone, FiMail, FiLock } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";

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
      if (credentials.password !== credentials.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      const newUser = {
        name: contact.name,
        dni: contact.dni,
        phone: contact.phone,
        email: contact.email,
        transport,
        selfieBase64,
        dniFrontBase64,
        username: credentials.username,
        password: credentials.password,
        registeredAt: new Date().toISOString(),
        profit: "0.00",
        record: 0,
        totalToday: 0
      };

      // GUARDAMOS EN EL ARRAY DE USUARIOS REGISTRADOS
      const allUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      allUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(allUsers));

      // Y COMO USUARIO ACTIVO
      localStorage.setItem("chaskysUser", JSON.stringify(newUser));

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

        {(step === 2 || step === 3) && (
          <button
            type="button"
            className="btn-back-arrow-register"
            onClick={() => setStep(step - 1)}
          >
            <IoArrowBack size={28} />
          </button>
        )}

        {/* =================== PASO 1 =================== */}
        {step === 1 && (
          <div className="form-body">
            <div className="input-wrapper2">
              <FiUser className="icon" />
              <input type="text" placeholder="Nombre Completo" required
                value={contact.name} onChange={(e) => setContact({...contact, name: e.target.value})} />
            </div>
            <div className="input-wrapper2">
              <FiCreditCard className="icon" />
              <input type="text" placeholder="DNI o CE" required
                value={contact.dni} onChange={(e) => setContact({...contact, dni: e.target.value})} />
            </div>
            <div className="input-wrapper2">
              <FiPhone className="icon" />
              <input type="tel" placeholder="Teléfono" required
                value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} />
            </div>
            <div className="input-wrapper2">
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
              <div className={`validation-status-icon ${selfieBase64 ? 'uploaded' : 'not-uploaded'}`}>
                {selfieBase64 ? "✓" : "✕"}
              </div>
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
              <div className={`validation-status-icon ${dniFrontBase64 ? 'uploaded' : 'not-uploaded'}`}>
                {dniFrontBase64 ? "✓" : "✕"}
              </div>
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
            <div className="input-wrapper2">
              <FiUser className="icon" />
              <input type="text" placeholder="Usuario" required
                value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})} />
            </div>
            <div className="input-wrapper2">
              <FiLock className="icon" />
              <input type="password" placeholder="Contraseña" required
                value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
            </div>
            <div className="input-wrapper2">
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

      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-check">✓</div>
            <h2>¡Cuenta creada con éxito!</h2>
            <p>Inicia sesión con tus nuevas credenciales</p>
            <button 
              className="btn btn-continue-register"
              onClick={() => navigate("/login")}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};