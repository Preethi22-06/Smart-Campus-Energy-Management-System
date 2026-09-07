import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

function FloorDetails() {
  const [floor, setFloor] = useState(null);

  const floorId = window.location.pathname.split("/")[2];
  const totalRooms = floor?.rooms?.length || 0;

const totalDevices =
  floor?.rooms?.reduce(
    (total, room) => total + (room.devices?.length || 0),
    0
  ) || 0;
  const activeDevices =
  floor?.rooms?.reduce(
    (total, room) =>
      total +
      (room.devices || []).filter(
        (device) => device.status === "ON"
      ).length,
    0
  ) || 0;

const inactiveDevices = totalDevices - activeDevices;

const activePower =
  floor?.rooms?.reduce(
    (total, room) =>
      total +
      (room.devices || [])
        .filter((device) => device.status === "ON")
        .reduce((power, device) => power + device.powerRating, 0),
    0
  ) || 0;
  let energyStatus = "Normal";
let energyMessage = "Floor energy usage is within the expected range.";

if (activePower > 300) {
  energyStatus = "High Usage";
  energyMessage = "Floor is consuming a high amount of power.";
}

  useEffect(() => {
  const fetchFloor = () => {
    fetch(`http://localhost:8080/floors/${floorId}`)
      .then((response) => response.json())
      .then((data) => {
        setFloor(data);
      })
      .catch((error) => {
        console.error("Error fetching floor:", error);
      });
  };

  fetchFloor();

  const interval = setInterval(fetchFloor, 5000);

  return () => clearInterval(interval);
}, [floorId]);

  if (!floor) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white p-8">
        Loading floor...
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-[#0b1120] text-white p-8">

    {/* Back */}
    <button
      onClick={() => window.history.back()}
      className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8"
    >
      <ArrowLeft size={18} />
      Back
    </button>

    <h1 className="text-3xl font-semibold">
      Floor {floor.floorNumber}
    </h1>

    <p className="text-slate-400 mt-2">
      Rooms on this floor
    </p>
     <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-8 mb-8">

  {/* Total Rooms */}
  <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
    <p className="text-sm text-slate-400">
      Total Rooms
    </p>

    <h2 className="text-3xl font-semibold mt-2">
      {totalRooms}
    </h2>
  </div>

  {/* Total Devices */}
  <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
    <p className="text-sm text-slate-400">
      Total Devices
    </p>

    <h2 className="text-3xl font-semibold mt-2">
      {totalDevices}
    </h2>
  </div>
{/* Active Devices */}
<div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
  <p className="text-sm text-slate-400">
    Active Devices
  </p>

  <h2 className="text-3xl font-semibold mt-2 text-emerald-400">
    {activeDevices}
  </h2>
</div>

{/* Inactive Devices */}
<div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
  <p className="text-sm text-slate-400">
    Inactive Devices
  </p>

  <h2 className="text-3xl font-semibold mt-2 text-slate-400">
    {inactiveDevices}
  </h2>
</div>

  {/* Active Power */}
  <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
    <p className="text-sm text-slate-400">
      Active Power
    </p>

    <h2 className="text-3xl font-semibold mt-2 text-yellow-400">
      {activePower} W
    </h2>
  </div>

</div>

{/* Energy Status */}
<div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 mb-8">

  <p className="text-sm text-slate-400">
    Energy Status
  </p>

  <div className="flex items-center gap-3 mt-4">

    <span
      className={`w-3 h-3 rounded-full ${
        energyStatus === "Normal"
          ? "bg-emerald-400"
          : "bg-red-400"
      }`}
    ></span>

    <h2
      className={`text-xl font-semibold ${
        energyStatus === "Normal"
          ? "text-emerald-400"
          : "text-red-400"
      }`}
    >
      {energyStatus}
    </h2>

  </div>

  <p className="text-slate-400 mt-3">
    {energyMessage}
  </p>

</div>

  </div>
);
}

export default FloorDetails;