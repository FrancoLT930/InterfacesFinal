import { useEffect, useState } from "react";
import { Histo } from "./oders/Histo";

export const Historial = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/historial.json");
        if (!response.ok) throw new Error("No encontrado");
        const data = await response.json();
        setHistorial(data);
      } catch (error) {
        console.error("Error cargando historial:", error);
        setHistorial([]);
      }
    };
    fetchData();
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
            date={pedido.date}
            time={pedido.time}
            status={pedido.status || "Entregado"}
          />
        ))
      )}
    </section>
  );
};