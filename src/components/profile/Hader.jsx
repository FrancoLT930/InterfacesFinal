import { useNavigate } from "react-router-dom";

export const HaderProfile = ({ type = "Chasky Básico" }) => {
  const navigate = useNavigate();

  return (
    <div className="header-profile">
      <span className="back-arrow" onClick={() => navigate("/home")}>
        ←
      </span>

      <div className="header-title">
        <span className="header-profile-name">Chaskys</span>
        <span className="header-profile-subname">Delivery app</span>
      </div>

      <span className="header-profile-type">{type}</span>
    </div>
  );
};