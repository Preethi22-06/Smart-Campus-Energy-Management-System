
import { useEffect, useState } from "react";
import { ArrowLeft, Lightbulb, Fan, ArrowRight } from "lucide-react";

function RoomDetails() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const roomId = window.location.pathname.split("/")[2];
  const floorId = new URLSearchParams(window.location.search).get("floor");

  const totalDevices = room?.devices?.length || 0;

  const activeDevices =
    room?.devices?.filter((device) => device.status === "ON").length || 0;

  const inactiveDevices = totalDevices - activeDevices;

  const activePower =
    room?.devices
      ?.filter((device) => device.status === "ON")
      .reduce(
        (total, device) => total + Number(device.powerRating || 0),
        0
      ) || 0;

  const hours = 5;
  const rate = 8;

  const activeEnergy = (activePower * hours) / 1000;
  const estimatedCost = activeEnergy * rate;

  let energyStatus = "Normal";
  let energyMessage = "Room energy usage is within the expected range.";

  if (activePower > 100) {
    energyStatus = "High Usage";
    energyMessage = "Room is consuming a high amount of power.";
  } else if (activeDevices > 0) {
    energyStatus = "Active";
    energyMessage = "Some devices in this room are currently ON.";
  } else {
    energyStatus = "Everything is OK";
    energyMessage = "All devices in this room are currently OFF.";
  }

  useEffect(() => {
    const fetchRoom = () => {
      fetch(`http://localhost:8080/rooms/${roomId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch room");
          }

          return response.json();
        })
        .then((data) => {
          setRoom(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching room:", error);
          setLoading(false);
        });
    };

    fetchRoom();

    const interval = setInterval(fetchRoom, 5000);

    return () => clearInterval(interval);
  }, [roomId]);

  const updateDeviceStatus = (device) => {
    const action = device.status === "ON" ? "off" : "on";

    fetch(`http://localhost:8080/devices/${device.id}/${action}`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update device status");
        }

        return response.json();
      })
      .then((updatedDevice) => {
        setRoom((previousRoom) => ({
          ...previousRoom,
          devices: previousRoom.devices.map((currentDevice) =>
            currentDevice.id === updatedDevice.id
              ? updatedDevice
              : currentDevice
          ),
        }));
      })
      .catch((error) => {
        console.error("Error updating device:", error);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white p-8">
        Loading room...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white p-8">
        <p className="text-red-400">Room could not be loaded.</p>

        <button
          onClick={() => {
            window.location.href = `/floors/${floorId}`;
          }}
          className="mt-5 text-slate-400 hover:text-white transition"
        >
          ← Back to Floor
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-8">

      {/* Back */}
      <button
        onClick={() => {
          window.location.href = `/floors/${floorId}`;
        }}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8"
      >
        <ArrowLeft size={18} />
        Back to Floor
      </button>

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-slate-400">
          Floor {floorId}
        </p>

        <h1 className="text-3xl font-semibold mt-1">
          Room {room.roomNumber}
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor devices and energy usage in this room.
        </p>
      </div>

      {/* Room Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

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
            Inactive Devices
          </p>

          <h2 className="text-3xl font-semibold mt-2 text-slate-400">
            {inactiveDevices}
          </h2>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <p className="text-sm text-slate-400">
            Active Power
          </p>

          <h2 className="text-3xl font-semibold mt-2 text-yellow-400">
            {activePower.toFixed(2)} W
          </h2>
        </div>

      </div>

      {/* Energy Overview */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 mb-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>
            <p className="text-sm text-slate-400">
              Energy Overview
            </p>

            <h2 className="text-xl font-semibold mt-1">
              Room Consumption
            </h2>
          </div>

          <div className="md:text-right">
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
              {activePower.toFixed(2)} W
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

      {/* Energy Status */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 mb-8">

        <p className="text-sm text-slate-400">
          Energy Status
        </p>

        <div className="flex items-center gap-3 mt-4">

          <span
            className={`w-3 h-3 rounded-full ${
              energyStatus === "Everything is OK"
                ? "bg-emerald-400"
                : energyStatus === "Active"
                ? "bg-yellow-400"
                : energyStatus === "Normal"
                ? "bg-emerald-400"
                : "bg-red-400"
            }`}
          ></span>

          <h2
            className={`text-xl font-semibold ${
              energyStatus === "Everything is OK"
                ? "text-emerald-400"
                : energyStatus === "Active"
                ? "text-yellow-400"
                : energyStatus === "Normal"
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

      {/* Devices */}
      <div>
        <h2 className="text-xl font-semibold mb-5">
          Devices
        </h2>

        {totalDevices === 0 ? (

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-semibold">
              No devices found
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              No devices have been added to this room yet.
            </p>
          </div>

        ) : (

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

                <button
                  onClick={() => {
                    window.location.href = `/devices/${device.id}`;
                  }}
                  className="flex items-center justify-between gap-2 w-full text-left mt-5 group"
                >
                  <h3 className="text-lg font-semibold group-hover:text-blue-400 transition">
                    {device.deviceName || "Unnamed Device"}
                  </h3>

                  <ArrowRight
                    size={18}
                    className="text-slate-500 group-hover:text-blue-400 transition"
                  />
                </button>

                <p className="text-sm text-slate-400 mt-1">
                  {device.deviceType || "Unknown Type"}
                </p>

                <p className="text-sm text-slate-400 mt-4">
                  Power: {Number(device.powerRating || 0).toFixed(2)} W
                </p>

                <button
                  onClick={() => updateDeviceStatus(device)}
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
        )}

      </div>

    </div>
  );
}

export default RoomDetails;