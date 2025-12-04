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

      const completedOrders = JSON.parse(localStorage.getItem("completedOrders") || "[]");
      const availableOrders = data.filter(order => !completedOrders.includes(order.id));

      setOrders(availableOrders);
    } catch (error) {
      setOrders([]);
    }
  };

  fetchData();
  // Escuchamos cambios en localStorage (aunque sea en la misma pestaña)
  window.addEventListener("storage", fetchData);
  return () => window.removeEventListener("storage", fetchData);
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