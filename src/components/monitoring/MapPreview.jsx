import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Map } from "../shared/Map";

export const MapMonitoring = ({ id }) => {
  const [isLoagin, setIsLoagin] = useState(false);
  const [count, setCount] = useState(5);
  const [order, setOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const { data } = await response.json();
        const found = data.find((o) => o.id == id);
        setOrder(found || null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handlerCancel = () => navigate("/home");

  const handlerAccept = () => {
    setIsLoagin(true);
    setCount(5);
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsLoagin(false);
          navigate("/confirm-order", { state: { order } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (!order) {
    return (
      <div className="loagin-accept">
        <span>Cargando pedido...</span>
      </div>
    );
  }

  const totalItems = order.orderDetails.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="card monitoring" style={{ position: "relative" }}>
      {/* DETALLE DEL PEDIDO */}
      <div className="detalle-pedido">
        <div className="detalle-header">
          <h2>{order.client}</h2>
          <p className="detalle-amount">S/ {order.amount}</p>
        </div>

        <div className="detalle-body">
          <p><strong>Origen:</strong> {order.address.origin}</p>
          <p><strong>Destino:</strong> {order.address.destination}</p>
          <p><strong>Distancia:</strong> {order.km} km</p>
          {order.paymentMethod && <p><strong>Pago:</strong> {order.paymentMethod}</p>}
        </div>
      </div>

      <div className="detalle-detalle">
        <h3><strong>Detalle de Pedido</strong></h3>
        <p><strong>Id Pedido:</strong> {order.id}</p>
        <p><strong>{totalItems} productos:</strong></p>
        <ul className="items-list">
          {order.orderDetails.items.map((item, i) => (
            <li key={i}>
              {item.quantity}x {item.name} {item.notes ? `(${item.notes})` : ""}
            </li>
          ))}
        </ul>
      </div>

      {/* MAPA */}
      <div className="map">
        <Map mOrigin={order.origin} mDestination={order.destination} />
      </div>

      {/* BOTONES */}
      <div className="btns-monitoring">
        <button className="btn-cancel" onClick={handlerCancel}>
          Cancelar
        </button>
        <button className="btn-accept" onClick={handlerAccept} disabled={isLoagin}>
          Aceptar
        </button>
      </div>

      {/* LOADING SOBRE TODO (overlay) */}
      {isLoagin && (
        <div className="loagin-accept">
          <img src="/cargando.svg" alt="Cargando" />
          <span>Aceptando carrera...!</span>
          <span>{count}s</span>
        </div>
      )}
    </section>
  );
};