import { useEffect, useState } from "react";
import { Histo } from "./oders/Histo";

export const Historial = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("chaskysUser");

    if (!savedUser) {
      setHistorial([]);
      return;
    }

    const user = JSON.parse(savedUser);

    // SI ES ADMIN → CARGA EL HISTORIAL COMPLETO DEL JSON
    if (user.isAdmin || user.username === "admin") {
      const fetchData = async () => {
        try {
          const response = await fetch("/historial.json");
          if (!response.ok) throw new Error("No encontrado");
          const data = await response.json();
          setHistorial(data);
        } catch (error) {
          console.error("Error cargando historial del admin:", error);
          setHistorial([]);
        }
      };
      fetchData();
    } else {
      // SI ES REPARTIDOR NORMAL → CARGA SU HISTORIAL PERSONAL
      const allHistory = JSON.parse(localStorage.getItem("userHistory") || "{}");
      const personalHistory = allHistory[user.username] || [];
      setHistorial(personalHistory);
    }
  }, []);

  return (
    <section className="card order-home">
      <div className="order-home-title">
        <span>HISTORIAL DE PEDIDOS</span>
      </div>

      {historial.length === 0 ? (
        <div className="historial-empty">
          No hay pedidos en el historial
        </div>
      ) : (
        historial.map((pedido) => (
          <Histo
            key={pedido.id}
            id={pedido.id}
            client={pedido.client}
            amount={pedido.amount}
            address={pedido.address}
            km={pedido.km}
            paymentMethod={pedido.paymentMethod}
            date={pedido.date || new Date(pedido.deliveredAt).toLocaleDateString()}
            time={pedido.time || new Date(pedido.deliveredAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            status={pedido.status || "Entregado"}
          />
        ))
      )}
    </section>
  );
};