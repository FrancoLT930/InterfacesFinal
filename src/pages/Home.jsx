import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HeaderHome } from "../components/home/Header";
import { ProfitHome } from "../components/home/Profit";
import { RecordHome } from "../components/home/Record";
import { OdersHome } from "../components/home/Oders";
import { Historial } from "../components/home/Historial";
import { OrdersAvailableHome } from "../components/home/OrdersAvailable";

import "../styles/Home.css";

export const Home = () => {
  const navigate = useNavigate();

  const [isVisibleHistorial, setIsVisibleHistorial] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem("chaskysUser");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUserData(parsed);
        setIsAdmin(parsed.username === "admin" || !parsed.name);
      } else {
        setUserData({ name: "Juan", profit: "0.00", record: 0, totalToday: 0 });
        setIsAdmin(true);
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    const interval = setInterval(loadUser, 1000);

    return () => {
      window.removeEventListener("storage", loadUser);
      clearInterval(interval);
    };
  }, []);

  const handlerViewHistorial = () => setIsVisibleHistorial(true);
  const handlerViewOrdersAvailable = () => setIsVisibleHistorial(false);

  const displayName = userData?.name || "Juan";
  const displayType = isAdmin ? "Chasky Premium" : "Chasky Básico";

  const displayProfit = userData?.profit || "0.00";
  const displayRecord = userData?.record || 0;
  const displayTotalToday = userData?.totalToday || 0;

  return (
    <div>
      <HeaderHome name={displayName} type={displayType} />
      <ProfitHome profit={displayProfit} />

      {isVisibleHistorial ? (
        <OrdersAvailableHome onViewOrdersAvailable={handlerViewOrdersAvailable} />
      ) : (
        <RecordHome
          record={displayRecord}
          total={displayTotalToday}
          onViewHistorial={handlerViewHistorial}
        />
      )}

      {isVisibleHistorial ? <Historial /> : <OdersHome />}

      {isAdmin && !isVisibleHistorial && (
        <div className="historial-home-button">
          <button
            className="btn-ver-historial"
            onClick={handlerViewHistorial}
          >
            Ver Historial
          </button>
        </div>
      )}
    </div>
  );
};