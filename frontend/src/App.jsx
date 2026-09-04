import Dashboard from "./Dashboard";
import Devices from "./Devices";

function App() {
  const path = window.location.pathname;

  if (path === "/devices") {
    return <Devices />;
  }

  return <Dashboard />;
}

export default App;