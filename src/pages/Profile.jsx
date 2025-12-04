import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HaderProfile } from "../components/profile/Hader";
import { IoArrowBack } from "react-icons/io5"; // ← FLECHA

import "../styles/Profile.css";

export const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("chaskysUser");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserData(parsed);
      setEditedData(parsed);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleSave = () => {
    const updatedUser = {
      ...userData,
      name: editedData.name || userData.name,
      phone: editedData.phone || userData.phone,
      email: editedData.email || userData.email,
    };
    localStorage.setItem("chaskysUser", JSON.stringify(updatedUser));
    setUserData(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("chaskysUser");
    navigate("/");
  };

  if (!userData) return null;

  const displayName = userData.name || "Chasky";
  const displayType = userData.type || "Chasky Básico";
  const avatarSrc = userData.selfieBase64 
    ? userData.selfieBase64 
    : (userData.isAdmin || userData.username === "admin" 
        ? "https://i.imgur.com/oAHT0Um.jpeg"  
        : "https://via.placeholder.com/120/FF6B6B/FFFFFF?text=User");

  return (
    <div className="profile-page">
      <HaderProfile type={displayType} />

      <button 
        className="btn-back-arrow-profile"
        onClick={() => navigate(-1)}
      >
        <IoArrowBack size={28} />
      </button>

      <div className="profile-body">
        <div className="profile-avatar-container">
          <img src={avatarSrc} alt="Avatar" className="profile-avatar" />
        </div>

        <div className={`profile-info ${isEditing ? 'editing' : ''}`}>
          <div className="info-row">
            <span className="label">Usuario:</span>
            <div className="value">{userData.username || "No definido"}</div>
          </div>

          <div className="info-row">
            <span className="label">Contraseña:</span>
            <div className="value">********</div>
          </div>

          <div className="info-row">
            <span className="label">Nombre Completo</span>
            {isEditing ? (
              <input
                type="text"
                value={editedData.name || ""}
                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              />
            ) : (
              <div className="value">{displayName}</div>
            )}
          </div>

          <div className="info-row">
            <span className="label">Teléfono</span>
            {isEditing ? (
              <input
                type="tel"
                value={editedData.phone || ""}
                onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
              />
            ) : (
              <div className="value">{userData.phone || "No definido"}</div>
            )}
          </div>

          <div className="info-row">
            <span className="label">Correo</span>
            {isEditing ? (
              <input
                type="email"
                value={editedData.email || ""}
                onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
              />
            ) : (
              <div className="value">{userData.email || "No definido"}</div>
            )}
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-edit" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
            {isEditing ? "Guardar" : "Editar"}
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};