import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeaderHome } from "../components/home/Header";
import { MapConfirmMonitoring } from "../components/monitoring/MapConfirm";

import "../styles/ConfirmOrder.css";

export const ConfirmOrder = () => {
  const [firstView, setFirstView] = useState(true);
  const [hasArrived, setHasArrived] = useState(false);

  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    const timer = setTimeout(() => setFirstView(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!firstView) {
      const timer = setTimeout(() => setHasArrived(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [firstView]);

  if (firstView) {
    return (
      <>
        <HeaderHome />
        <div className="confirm-order">
          <img src="/icon_check.svg" alt="Check" />
          <span>Pedido confirmado...!</span>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderHome />

      <h3 className="msg-arrive">
        {hasArrived ? "¡Has llegado al restaurante!" : "Camino al restaurante"}
      </h3>

      <MapConfirmMonitoring order={order} hasArrived={hasArrived} />
    </>
  );
};