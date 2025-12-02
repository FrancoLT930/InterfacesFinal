export const ProfitHome = ({ profit = "0.00" }) => {
  return (
    <section className="profit-home">
      <span className="profit-home-title">Ganancia Semanal</span>
      <span className="profit-home-summary">S/ {profit}</span>
    </section>
  );
};