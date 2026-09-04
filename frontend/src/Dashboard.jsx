import { useEffect, useState } from "react";

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/devices/summary?hours=5&rate=8")
      .then((response) => response.json())
      .then((data) => {
        setSummary(data);
      })
      .catch((error) => {
        console.error("Error fetching campus summary:", error);
      });
  }, []);

  if (!summary) {
    return <p>Loading campus data...</p>;
  }

  return (
    <div>
      <h2>Campus Overview</h2>

      <div>
        <h3>Total Devices</h3>
        <p>{summary.totalDevices}</p>
      </div>

      <div>
        <h3>Active Devices</h3>
        <p>{summary.onDevices}</p>
      </div>

      <div>
        <h3>Active Power</h3>
        <p>{summary.activePower} {summary.powerUnit}</p>
      </div>

      <div>
        <h3>Energy Consumption</h3>
        <p>{summary.activeEnergy} {summary.energyUnit}</p>
      </div>
    </div>
  );
}

export default Dashboard;