import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderHome } from "../components/home/Header";

import "../styles/DeliveryCompleted.css";

export const DeliveryCompleted = () => {
  const [firstView, setFirstView] = useState(true);
  const [rating, setRating] = useState(0);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [comment, setComment] = useState("");
  const [showThanks, setShowThanks] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    const timer = setTimeout(() => setFirstView(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const positiveReasons = [
    "Cliente amable",
    "Entrega rápida",
    "Pago correcto",
    "Buena comunicación"
  ];

  const negativeReasons = [
    "Cliente grosero",
    "Pago incorrecto",
    "No estaba en casa",
    "Problemas con la dirección"
  ];

  const handleRating = (value) => {
    setRating(value);
    setSelectedReasons([]);
  };

  const toggleReason = (reason) => {
    setSelectedReasons(prev =>
      prev.includes(reason)
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSubmit = () => {
    console.log("Calificación:", {
      cliente: order?.client,
      estrellas: rating,
      motivos: selectedReasons,
      comentario: comment
    });

    const currentUser = JSON.parse(localStorage.getItem("chaskysUser") || "{}");

    // === ACTUALIZAMOS GANANCIA ===
    const monto = parseFloat(order.amount);
    const gananciaActual = parseFloat(currentUser.profit || "0.00");
    const nuevaGanancia = (gananciaActual + monto).toFixed(2);

    // === ACTUALIZAMOS RECORD (total histórico) ===
    const recordActual = parseInt(currentUser.record || "0");
    const nuevoRecord = recordActual + 1;

    // === ACTUALIZAMOS TOTAL HOY (se reinicia cada día) ===
    const hoy = new Date().toLocaleDateString();
    let totalHoy = parseInt(currentUser.totalToday || "0");

    if (currentUser.lastDeliveryDate !== hoy) {
      totalHoy = 1;
    } else {
      totalHoy += 1;
    }

    // === GUARDAMOS EN HISTORIAL PERSONAL ===
    const userHistory = JSON.parse(localStorage.getItem("userHistory") || "{}");

    if (!userHistory[currentUser.username]) {
      userHistory[currentUser.username] = [];
    }

    const deliveredOrder = {
      id: order.id,
      client: order.client,
      amount: order.amount,
      km: order.km,
      address: order.address,
      paymentMethod: order.paymentMethod,
      date: hoy,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "Entregado",
      rating,
      reasons: selectedReasons,
      comment
    };

    userHistory[currentUser.username].push(deliveredOrder);

    // === OBJETO ACTUALIZADO DEL USUARIO ===
    const updatedUser = {
      ...currentUser,
      profit: nuevaGanancia,
      record: nuevoRecord,
      totalToday: totalHoy,
      lastDeliveryDate: hoy
    };

    // === GUARDAMOS EN chaskysUser (usuario activo) ===
    localStorage.setItem("chaskysUser", JSON.stringify(updatedUser));
    localStorage.setItem("userHistory", JSON.stringify(userHistory));

    const allRegistered = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const updatedRegistered = allRegistered.map(u => 
      u.username === updatedUser.username ? updatedUser : u
    );
    localStorage.setItem("registeredUsers", JSON.stringify(updatedRegistered));

    // === MARCAMOS COMO COMPLETADO ===
    const completedOrders = JSON.parse(localStorage.getItem("completedOrders") || "[]");
    if (!completedOrders.includes(order.id)) {
      completedOrders.push(order.id);
      localStorage.setItem("completedOrders", JSON.stringify(completedOrders));
    }

    setShowThanks(true);
    setTimeout(() => navigate("/home"), 2000);
  };

  const currentReasons = rating >= 4 ? positiveReasons : negativeReasons;

  if (firstView) {
    return (
      <>
        <HeaderHome />
        <div className="completed-check">
          <img src="/icon_check.svg" alt="Check" />
          <h2>¡Pedido entregado!</h2>
        </div>
      </>
    );
  }

  if (showThanks) {
    return (
      <>
        <HeaderHome />
        <div className="completed-thanks">
          <h2>¡Gracias por tus comentarios!</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderHome />

      <section className="completed-container">
        <h2>¿Cómo fue tu experiencia con?</h2>
        <p className="client-name">{order?.client}</p>

        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "filled" : ""}`}
              onClick={() => handleRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        {rating > 0 && (
          <div className="reasons-container">
            {currentReasons.map((reason) => (
              <button
                key={reason}
                className={`reason-btn ${selectedReasons.includes(reason) ? "selected" : ""}`}
                onClick={() => toggleReason(reason)}
              >
                {reason}
              </button>
            ))}
          </div>
        )}

        <textarea
          placeholder="Comentario adicional (opcional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
        />

        <button
          className="btn-submit-rating"
          onClick={handleSubmit}
          disabled={rating === 0}
        >
          Enviar calificación
        </button>
      </section>
    </>
  );
};