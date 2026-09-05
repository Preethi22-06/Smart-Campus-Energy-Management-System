import Dashboard from "./Dashboard";
import Devices from "./Devices";
import Buildings from "./Buildings";
import BuildingDetails from "./BuildingDetails";
import FloorDetails from "./FloorDetails";
import RoomDetails from "./RoomDetails";

function App() {
  const path = window.location.pathname;

  if (path === "/devices") {
    return <Devices />;
  }
  if (path.startsWith("/rooms/")) {
  return <RoomDetails />;
}
  if (path.startsWith("/floors/")) {
  return <FloorDetails />;
}
  if (path.startsWith("/buildings/")) {
  return <BuildingDetails />;
}

  if (path === "/buildings") {
    return <Buildings />;
  }

  return <Dashboard />;
}
export default App;