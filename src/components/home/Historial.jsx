import { Order } from './oders/Order'

export const HistorialHome = () => {
  return (
    <section className="card order-home">
      <div className="order-home-title">
        <span>HISTORIAL DE  PEDIDOS</span>
      </div>
      <Order />
    </section>
  );
};
