import { useLocation, useNavigate } from "react-router-dom";
import { HeaderHome } from "../components/home/Header";
import { Map } from "../components/shared/Map";
import { useState } from "react";

import "../styles/DeliveryTracking.css";

export const DeliveryTracking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const [showToast, setShowToast] = useState(false);

  if (!order) {
    return (
      <>
        <HeaderHome />
        <div className="error">Error: No se encontró el pedido</div>
      </>
    );
  }

 const handleDelivered = () => {
  navigate("/delivery-completed", { state: { order } });
};

  const handleCall = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // desaparece en 3 segundos
  };

  return (
    <>
      <HeaderHome />

      <section className="delivery-container">
        {/* BARRA SUPERIOR */}
        <div className="delivery-top-bar">
          <button className="btn-delivered" onClick={handleDelivered}>
            Pedido entregado
          </button>
          <button className="btn-call" onClick={handleCall}>
            <img src="/call.svg" alt="Llamar" />
          </button>
        </div>

        {/* CARD DEL CLIENTE */}
        <div className="delivery-card">
          <div className="delivery-header">
            <h2>{order.client}</h2>
            <p className="delivery-amount">S/ {order.amount}</p>
          </div>
          <p className="delivery-address">{order.address.destination}</p>
          <div className="delivery-info">
            <span>Distancia: {order.km} km</span>
            <span>31/01/2025 09:15</span>
          </div>
        </div>

        {/* MAPA GRANDE */}
        <div className="delivery-map">
          <Map mOrigin={order.origin} mDestination={order.destination} />
        </div>

        {/* TOAST LLAMADA */}
        {showToast && (
          <div className="call-toast">
            <span> {order.client}...</span>
          </div>
        )}
      </section>
    </>
  );
};