import { useEffect, useState } from "react";
import { ArrowLeft, Lightbulb, Fan } from "lucide-react";

function RoomDetails() {
  const [room, setRoom] = useState(null);

  const roomId = window.location.pathname.split("/")[2];

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

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default RoomDetails;