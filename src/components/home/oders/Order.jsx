import { useNavigate } from "react-router-dom";

export const Order = ({ id, client, amount, address, km, paymentMethod }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/monitoring-order/${id}`);
  };

  return (
    <div className="card-order" onClick={handleClick}>
      <div className="card-order-name-summary">
        <span className="client-name">{client}</span>
        <span className="order-amount">S/ {amount}</span>
      </div>

      <div className="card-order-details">
        <div className="address-info">
          <span><b>Origen:</b>{address.origin}</span>
          <span><b>Destino:</b>{address.destination}</span>
        </div>
        <div className="distance-info">
          <span>Distancia: {km}km</span>
          {paymentMethod && <span className="payment-method">{paymentMethod}</span>}
        </div>
      </div>
    </div>
  );
};