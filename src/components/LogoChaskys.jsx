export const LogoChaskys = ({ descripcion }) => {
  return (
    <>
      <div className="logo">
        <img src="Motorizado.svg"></img>
      </div>
      <section className="title">
        <h1 className="title-h1">Chaskys</h1>
        <span className="subtitle">{descripcion}</span>
      </section>
    </>
  );
};
