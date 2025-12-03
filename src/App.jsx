import "./App.css";
import { Routes, Route } from "react-router";

// pages
import { Login } from "./pages/Login";
import { Register } from "./pages/Register"
import { Home } from "./pages/Home"
import { Profile } from "./pages/Profile"
import { MonitoringOrder } from "./pages/MonitoringOrder"
import { ConfirmOrder } from "./pages/ConfirmOrder"
import { DeliveryTracking } from "./pages/DeliveryTracking";
import { DeliveryCompleted } from "./pages/DeliveryCompleted";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="monitoring-order/:id" element={<MonitoringOrder />} />
        <Route path="confirm-order" element={<ConfirmOrder />} />
        <Route path="/delivery-tracking" element={<DeliveryTracking />} />
        <Route path="/delivery-completed" element={<DeliveryCompleted />} />
      </Routes>
    </>
  );
}

export default App;
