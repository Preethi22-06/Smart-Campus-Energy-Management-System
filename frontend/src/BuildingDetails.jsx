import { useEffect, useState } from "react";
import { ArrowLeft, Layers3 } from "lucide-react";

function BuildingDetails() {
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);

  const buildingId = window.location.pathname.split("/")[2];

  useEffect(() => {
    fetch(`http://localhost:8080/floors/building/${buildingId}`)
      .then((response) => response.json())
      .then((data) => {
        setFloors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching floors:", error);
        setLoading(false);
      });
  }, [buildingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white p-8">
        Loading floors...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-8">

      {/* Back */}
      <button
        onClick={() => {
          window.location.href = "/buildings";
        }}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition"
      >
        <ArrowLeft size={18} />
        Back to Buildings
      </button>

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-slate-400">
          Building {buildingId}
        </p>

        <h2 className="text-3xl font-semibold mt-1">
          Floors
        </h2>

        <p className="text-slate-400 mt-2">
          Select a floor to view its rooms and devices.
        </p>
      </div>

      {/* Floors */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {floors.map((floor) => (
         <div
  key={floor.id}
  onClick={() => {
    window.location.href = `/floors/${floor.id}`;
  }}
  className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition cursor-pointer"
>

            <div className="p-3 rounded-xl bg-purple-500/10 w-fit">
              <Layers3
                size={24}
                className="text-purple-400"
              />
            </div>

            <h3 className="text-xl font-semibold mt-5">
              Floor {floor.floorNumber}
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              View rooms and devices
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default BuildingDetails;