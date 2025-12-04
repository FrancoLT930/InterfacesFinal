import { useNavigate } from "react-router-dom";
import { Map } from "../shared/Map";

export const MapConfirmMonitoring = ({ order, hasArrived }) => {
  const navigate = useNavigate();

  if (!order) return null;

  const totalItems = order.orderDetails.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleDelivered = () => {
    navigate("/delivery-tracking", { state: { order } });
  };

  return (
    <section className="card monitoring">
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

      {/* boton deshabilitado hasta llegar luego de unos segundos */}
      <div className="btns-monitoring">
        <button
          className="btn-accept"
          onClick={handleDelivered}
          disabled={!hasArrived}
          style={!hasArrived ? { opacity: 0.6, cursor: "not-allowed" } : {}}
        >
          Tengo el Pedido
        </button>
      </div>
    </section>
  );
};