import { useNavigate } from "react-router-dom";

export const Order = ({ id, client, amount, address, km }) => {
  const navigate = useNavigate();

  const handlerRedictMonitoring = () => {
    navigate("/monitoring-order/" + id);
  };

  return (
    <div className="card-order" onClick={handlerRedictMonitoring}>
      <div className="card-order-name-summary">
        <span>{client}</span>
        <span>S/ {amount}</span>
      </div>
      <div className="card-order-details">
        <span>{address.origin}</span>
        <div>
          <span>Distancia: </span>
          <span>{km}km</span>
        </div>
        <span>{address.destination}</span>
        <span></span>
      </div>
    </div>
  );
};
