export const RecordHome = ({record, total, onViewHistorial}) => {
  return (
    <section className="card record-home">
      <div className="record-summary">
        <div>
          <span>Record: </span>
          <span>{record}</span>
        </div>
        <div>
          <span>Total: </span>
          <span>{total}</span>
        </div>
      </div>
      <div className="record-view-history" onClick={onViewHistorial}>
        <span>Ver Historial</span>
      </div>
    </section>
  );
};
