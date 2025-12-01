import { useParams } from "react-router-dom";
import { HeaderHome } from "../components/home/Header";
import { MapMonitoring } from "../components/monitoring/MapPreview";

import "../styles/MonitoringOrder.css";

export const MonitoringOrder = () => {
  const { id } = useParams();

  return (
    <>
      <HeaderHome />
      <MapMonitoring id={id} />
    </>
  );
};
