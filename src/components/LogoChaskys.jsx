export const LogoChaskys = ({ descripcion }) => {
  return (
    <>
      <div className="logo">
        <img src="Motorizado.svg"></img>
      </div>
      <section className="title">
        <h1 className="title-h1">Chaskys</h1>
        <span className="subtitulo">{descripcion}</span>
      </section>
    </>
  );
};
