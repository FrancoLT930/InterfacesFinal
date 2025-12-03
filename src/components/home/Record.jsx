export const RecordHome = ({ record = 0, total = 0, onViewHistorial }) => {
  return (
    <section className="card record-home">
      <div className="record-summary">
        <span>Record: {record}</span>
        <span>Total: {total}</span>
      </div>
      <div className="record-view-history">
        <button className="btn-historial" onClick={onViewHistorial}>Ver Historial</button>
      </div>
    </section>
  );
};