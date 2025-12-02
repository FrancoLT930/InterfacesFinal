import { useNavigate } from "react-router-dom";

export const HeaderHome = ({ name = "Chasky", type = "Chasky Básico" }) => {
  const navigate = useNavigate();

  const handlerRedictProfile = () => {
    navigate("/profile");
  };

  return (
    <section className="header-home">
      <div className="hader-user">
        <span className="header-user-name" onClick={handlerRedictProfile}>
          Hola, {name}
        </span>
        <span className="header-user-category color-orange">{type}</span>
      </div>

      <div className="header-logo">
        <span className="header-logo-name color-orange">Chaskys</span>
        <span className="header-logo-subname">Delivery app</span>
      </div>
    </section>
  );
};