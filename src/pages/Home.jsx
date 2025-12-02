import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HeaderHome } from "../components/home/Header";
import { ProfitHome } from "../components/home/Profit";
import { RecordHome } from "../components/home/Record";
import { OdersHome } from "../components/home/Oders";
import { HistorialHome } from "../components/home/Historial";
import { OrdersAvailableHome } from "../components/home/OrdersAvailable";

import "../styles/Home.css";

export const Home = () => {
  const navigate = useNavigate();

  const [isVisibleHistorial, setIsVisibleHistorial] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("chaskysUser");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUserData(parsed);
      if (parsed.username === "admin" || !parsed.name) {
        setIsAdmin(true);
      }
    } else {
      setUserData({ name: "Juan" });
      setIsAdmin(true);
    }
  }, []);

  const handlerViewHistorial = () => setIsVisibleHistorial(true);
  const handlerViewOrdersAvailable = () => setIsVisibleHistorial(false);

  const displayName = userData?.name || "Chasky";
  const displayType = isAdmin ? "Chasky Premium" : "Chasky Básico";
  const displayProfit = isAdmin ? "152.20" : "0.00";
  const displayRecord = isAdmin ? 253 : 0;
  const displayTotalToday = isAdmin ? 32 : 0;

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

      {isVisibleHistorial ? <HistorialHome /> : <OdersHome />}
    </div>
  );
};