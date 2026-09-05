import { useEffect, useState } from "react";

function FloorDetails() {
  const [floor, setFloor] = useState(null);

  const floorId = window.location.pathname.split("/")[2];

  useEffect(() => {
    fetch(`http://localhost:8080/floors/${floorId}`)
      .then((response) => response.json())
      .then((data) => {
        setFloor(data);
      })
      .catch((error) => {
        console.error("Error fetching floor:", error);
      });
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
      <h1 className="text-3xl font-semibold">
        Floor {floor.floorNumber}
      </h1>

      <p className="text-slate-400 mt-2">
        Rooms on this floor
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        {floor.rooms.map((room) => (
          <div
  key={room.id}
  onClick={() => {
    window.location.href = `/rooms/${room.id}`;
  }}
  className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition cursor-pointer"
>
            <p className="text-sm text-slate-400">
              Room
            </p>

            <h2 className="text-2xl font-semibold mt-2">
              {room.roomNumber}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FloorDetails;