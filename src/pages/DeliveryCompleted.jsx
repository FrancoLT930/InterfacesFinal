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
    setSelectedReasons([]); // limpia al cambiar la calificación
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
    setShowThanks(true);
    setTimeout(() => navigate("/home"), 2000);
  };

  // Pone que motivos mostrar según la calificación sea posi o negativa
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

        {/* estrellita donde estas */}
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

        {/*razones de calificacion */}
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

        {/* campo para comentario adicional*/}
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