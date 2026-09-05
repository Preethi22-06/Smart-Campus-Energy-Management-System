import { useEffect, useState } from "react";
import { ArrowLeft, Lightbulb, Fan } from "lucide-react";

function RoomDetails() {
  const [room, setRoom] = useState(null);

  const roomId = window.location.pathname.split("/")[2];
  const totalDevices = room?.devices?.length || 0;

const activeDevices =
  room?.devices?.filter((device) => device.status === "ON").length || 0;

const inactiveDevices = totalDevices - activeDevices;

const activePower =
  room?.devices
    ?.filter((device) => device.status === "ON")
    .reduce((total, device) => total + device.powerRating, 0) || 0;
    const hours = 5;
const rate = 8;

const activeEnergy = (activePower * hours) / 1000;
const estimatedCost = activeEnergy * rate;

  useEffect(() => {
    fetch(`http://localhost:8080/rooms/${roomId}`)
      .then((response) => response.json())
      .then((data) => {
        setRoom(data);
      })
      .catch((error) => {
        console.error("Error fetching room:", error);
      });
  }, [roomId]);

  if (!room) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white p-8">
        Loading room...
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

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-slate-400">
          Room
        </p>

        <h1 className="text-3xl font-semibold mt-1">
          {room.roomNumber}
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor devices and energy usage in this room.
        </p>
      </div>
      {/* Room Statistics */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
    {/* Energy Overview */}
<div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 mb-8">

  <div className="flex items-center justify-between mb-6">
    <div>
      <p className="text-sm text-slate-400">
        Energy Overview
      </p>

      <h2 className="text-xl font-semibold mt-1">
        Room Consumption
      </h2>
    </div>

    <div className="text-right">
      <p className="text-2xl font-semibold">
        {activeEnergy.toFixed(2)} kWh
      </p>

      <p className="text-sm text-slate-400">
        Estimated consumption
      </p>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    <div className="bg-[#0b1120] rounded-xl p-4">
      <p className="text-sm text-slate-400">
        Active Power
      </p>

      <p className="text-xl font-semibold mt-2">
        {activePower} W
      </p>
    </div>

    <div className="bg-[#0b1120] rounded-xl p-4">
      <p className="text-sm text-slate-400">
        Monitoring Period
      </p>

      <p className="text-xl font-semibold mt-2">
        {hours} hours
      </p>
    </div>

    <div className="bg-[#0b1120] rounded-xl p-4">
      <p className="text-sm text-slate-400">
        Estimated Cost
      </p>

      <p className="text-xl font-semibold mt-2">
        ₹{estimatedCost.toFixed(2)}
      </p>
    </div>

  </div>

</div>

  <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
    <p className="text-sm text-slate-400">
      Total Devices
    </p>

    <h2 className="text-3xl font-semibold mt-2">
      {totalDevices}
    </h2>
  </div>

  <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
    <p className="text-sm text-slate-400">
      Active Devices
    </p>

    <h2 className="text-3xl font-semibold mt-2 text-emerald-400">
      {activeDevices}
    </h2>
  </div>

  <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
    <p className="text-sm text-slate-400">
      Active Power
    </p>

    <h2 className="text-3xl font-semibold mt-2 text-yellow-400">
      {activePower} W
    </h2>
  </div>

</div>

      {/* Devices */}
      <div>
        <h2 className="text-xl font-semibold mb-5">
          Devices
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {room.devices.map((device) => (
            <div
              key={device.id}
              className="bg-[#111827] border border-slate-800 rounded-2xl p-6"
            >

              <div className="flex items-center justify-between">

                <div className="p-3 rounded-xl bg-blue-500/10">
                  {device.deviceType === "FAN" ? (
                    <Fan className="text-blue-400" size={24} />
                  ) : (
                    <Lightbulb className="text-yellow-400" size={24} />
                  )}
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    device.status === "ON"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-slate-500/10 text-slate-400"
                  }`}
                >
                  {device.status}
                </span>

              </div>

              <h3 className="text-lg font-semibold mt-5">
                {device.deviceName}
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                {device.deviceType}
              </p>

              <p className="text-sm text-slate-400 mt-4">
                Power: {device.powerRating} W
              </p>
              <button
  onClick={() => {
    const action = device.status === "ON" ? "off" : "on";

    fetch(`http://localhost:8080/devices/${device.id}/${action}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((updatedDevice) => {
        setRoom((prevRoom) => ({
          ...prevRoom,
          devices: prevRoom.devices.map((d) =>
            d.id === updatedDevice.id ? updatedDevice : d
          ),
        }));
      })
      .catch((error) => {
        console.error("Error updating device:", error);
      });
  }}
  className={`mt-5 w-full py-2 rounded-xl font-medium transition ${
    device.status === "ON"
      ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
      : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
  }`}
>
  {device.status === "ON" ? "Turn OFF" : "Turn ON"}
</button>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default RoomDetails;