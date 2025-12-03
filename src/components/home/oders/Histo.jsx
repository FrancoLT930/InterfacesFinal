export const Histo = ({ client, amount, address, km, paymentMethod, date, time, status }) => {
  return (
    <div className="card-order">
      <div className="card-order-name-summary">
        <span className="client-name">{client}</span>
        <span className="order-amount">S/ {amount}</span>
      </div>

      <div className="card-order-details">
        <div className="address-info">
          <span><b>Origen:</b> {address.origin}</span>
          <span><b>Destino:</b> {address.destination}</span>
        </div>
        <div className="distance-info">
          <span>Distancia: {km}km</span>
          {paymentMethod && <span className="payment-method">{paymentMethod}</span>}
        </div>
      </div>

      {/* INFO EXTRA DEL HISTORIAL */}
      <div className="historial-extra-info">
        <span>{date} • {time}</span>
        {status && <span className="status entregado">{status}</span>}
      </div>
    </div>
  );
};