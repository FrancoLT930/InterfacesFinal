import { useEffect, useState } from "react";
import { Order } from "./oders/Order";

export const OdersHome = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("No encontrado");
        const { data } = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="card order-home">
      <div className="order-home-title">
        <span>PEDIDOS DISPONIBLES</span>
      </div>
      {orders.map((order) => (
        <Order
          key={order.id}
          id={order.id}
          client={order.client}
          amount={order.amount}
          address={order.address}
          km={order.km}
          paymentMethod={order.paymentMethod}
        />
      ))}
    </section>
  );
};