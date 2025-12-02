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

  // Check inicial 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => setFirstView(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Después de 5 segundos cambia el mensaje
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

      {/* MENSAJE DINÁMICO */}
      <h3 className="msg-arrive">
        {hasArrived ? "¡Has llegado al restaurante!" : "Camino al restaurante"}
      </h3>

      {/* PASA EL ESTADO AL HIJO */}
      <MapConfirmMonitoring order={order} hasArrived={hasArrived} />
    </>
  );
};