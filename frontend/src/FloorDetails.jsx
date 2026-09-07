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
          .reduce(
            (power, device) => power + device.powerRating,
            0
          ),
      0
    ) || 0;

  let energyStatus = "Normal";
  let energyMessage =
    "Floor energy usage is within the expected range.";

  if (activePower > 300) {
    energyStatus = "High Usage";
    energyMessage =
      "Floor is consuming a high amount of power.";
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

      {/* Header */}
      <h1 className="text-3xl font-semibold">
        Floor {floor.floorNumber}
      </h1>

      <p className="text-slate-400 mt-2">
        Rooms on this floor
      </p>

      {/* Floor Statistics */}
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

      {/* Rooms */}
      <div>

        <h2 className="text-xl font-semibold mb-5">
          Rooms
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {floor.rooms.length === 0 ? (

            /* Empty State */
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8 text-center md:col-span-2">

              <h3 className="text-lg font-semibold">
                No rooms found
              </h3>

              <p className="text-sm text-slate-400 mt-2">
                No rooms have been added to this floor yet.
              </p>

            </div>

          ) : (

            floor.rooms.map((room) => {

              const roomDevices = room.devices || [];

              const roomActiveDevices =
                roomDevices.filter(
                  (device) => device.status === "ON"
                ).length;

              const roomActivePower =
                roomDevices
                  .filter(
                    (device) => device.status === "ON"
                  )
                  .reduce(
                    (total, device) =>
                      total + device.powerRating,
                    0
                  );

              /* Room Energy Status */
              let roomEnergyStatus = "Normal";

              if (roomActivePower > 100) {
                roomEnergyStatus = "High Usage";
              }

              return (
                <div
                  key={room.id}
                  onClick={() => {
                    window.location.href =
                      `/rooms/${room.id}?floor=${floorId}`;
                  }}
                  className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition cursor-pointer"
                >

                  <p className="text-sm text-slate-400">
                    Room
                  </p>

                  <h2 className="text-2xl font-semibold mt-2">
                    {room.roomNumber}
                  </h2>

                  {/* Room Statistics */}
                  <div className="grid grid-cols-3 gap-3 mt-5">

                    {/* Devices */}
                    <div className="bg-[#0b1120] rounded-xl p-3">

                      <p className="text-xs text-slate-400">
                        Devices
                      </p>

                      <p className="text-lg font-semibold mt-1">
                        {roomDevices.length}
                      </p>

                    </div>

                    {/* Active */}
                    <div className="bg-[#0b1120] rounded-xl p-3">

                      <p className="text-xs text-slate-400">
                        Active
                      </p>

                      <p className="text-lg font-semibold mt-1 text-emerald-400">
                        {roomActiveDevices}
                      </p>

                    </div>

                    {/* Power */}
                    <div className="bg-[#0b1120] rounded-xl p-3">

                      <p className="text-xs text-slate-400">
                        Power
                      </p>

                      <p className="text-lg font-semibold mt-1 text-yellow-400">
                        {roomActivePower} W
                      </p>

                    </div>

                  </div>

                  {/* Room Energy Status */}
                  <div className="mt-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        roomEnergyStatus === "Normal"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {roomEnergyStatus}
                    </span>

                  </div>

                </div>
              );
            })

          )}

        </div>

      </div>

    </div>
  );
}

export default FloorDetails;