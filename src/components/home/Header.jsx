import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const HeaderHome = () => {
  const [userName, setUserName] = useState("Chasky");
  const [userType, setUserType] = useState("Chasky Básico");

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("chaskysUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserName(user.name || user.username || "Chasky");
      setUserType(user.isAdmin ? "Chasky Premium" : "Chasky Básico");
    }
  }, []);

  const handlerRedictProfile = () => {
    navigate("/profile");
  };

  return (
    <section className="header-home">
      <div className="hader-user">
        <span className="header-user-name" onClick={handlerRedictProfile}>
          Hola, {userName}
        </span>
        <span className="header-user-category color-orange">{userType}</span>
      </div>

      <div className="header-logo">
        <span className="header-logo-name color-orange">Chaskys</span>
        <span className="header-logo-subname">Delivery app</span>
      </div>
    </section>
  );
};