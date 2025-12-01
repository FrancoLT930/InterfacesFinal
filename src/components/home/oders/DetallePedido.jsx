import "./DetallePedido.css";

export const DetallePedido = ({ order }) => {
  // Si no hay productos, no muestra nada
  if (!order?.orderDetails?.items || order.orderDetails.items.length === 0) {
    return null;
  }

  const items = order.orderDetails.items;
  const idPedido = String(order.id).padStart(8, "0");

  return (
    <div className="detalle-pedido">
      <h3 className="titulo">Detalle de Pedido</h3>

      <div className="cabecera">
        <div>Id Pedido: <strong>#{idPedido}</strong></div>
        <div>{items.length} {items.length === 1 ? "producto" : "productos"}</div>
      </div>

      <div className="productos">
        {items.map((item, i) => (
          <div key={i} className="linea">
            <span>{item.quantity}× {item.name}</span>
            {item.notes && <small> ({item.notes})</small>}
          </div>
        ))}
      </div>

      <div className="total">
        Total a cobrar <strong>S/ {order.amount}</strong>
      </div>
    </div>
  );
};