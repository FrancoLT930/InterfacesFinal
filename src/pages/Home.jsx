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

  // CARGAMOS EL USUARIO Y SU GANANCIA
  useEffect(() => {
    const savedUser = localStorage.getItem("chaskysUser");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUserData(parsed);
      setIsAdmin(parsed.username === "admin" || !parsed.name);
    } else {
      // Usuario por defecto (solo para pruebas)
      setUserData({ name: "Juan", profit: "0.00" });
      setIsAdmin(true);
    }
  }, []);

  const handlerViewHistorial = () => setIsVisibleHistorial(true);
  const handlerViewOrdersAvailable = () => setIsVisibleHistorial(false);

  // NOMBRE Y TIPO
  const displayName = userData?.name || "Juan";
  const displayType = isAdmin ? "Chasky Premium" : "Chasky Básico";

  // GANANCIA DINÁMICA (se actualiza con cada entrega)
  const displayProfit = userData?.profit || "0.00";

  // RECORD Y TOTAL HOY (solo admin los ve reales)
  const displayRecord = isAdmin ? 253 : 0;
  const displayTotalToday = isAdmin ? 32 : 0;

  return (
    <div>
      <HeaderHome name={displayName} type={displayType} />
      
      {/* GANANCIA SEMANAL DINÁMICA */}
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

      {/* PEDIDOS O HISTORIAL */}
      {isVisibleHistorial ? <Historial /> : <OdersHome />}

      {/* BOTÓN HISTORIAL (solo admin) */}
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