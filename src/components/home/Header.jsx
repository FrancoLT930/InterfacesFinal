import { useNavigate } from "react-router-dom";

export const HeaderHome = () => {

  const navigate = useNavigate();

    const handlerRedictProfile = () =>{
    navigate("/profile")
  }

  return (
    <section className="header-home">
      <div className="hader-user">
        <span className="header-user-name" onClick={handlerRedictProfile}>
          Jhefferson
        </span>
        <span className="header-user-category color-orange">Chasky Rider</span>
      </div>

      <div className="header-logo">
        <span className="header-logo-name color-orange">Chaskys</span>
        <span className="header-logo-subname">Delivery app</span>
      </div>
    </section>
  );
};
