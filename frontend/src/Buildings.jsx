import { useEffect, useState } from "react";
import { Building2, Layers3 } from "lucide-react";

function Buildings() {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/buildings")
      .then((response) => response.json())
      .then((data) => {
        setBuildings(data);
      })
      .catch((error) => {
        console.error("Error fetching buildings:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-8">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold">
          Buildings
        </h2>

        <p className="text-slate-400 mt-2">
          Explore campus buildings and their floors.
        </p>
      </div>

      {/* Buildings */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {buildings.map((building) => (
         <div
  key={building.id}
  onClick={() => {
    window.location.href = `/buildings/${building.id}`;
  }}
  className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition cursor-pointer"
>

            <div className="flex items-start justify-between">

              <div className="p-3 rounded-xl bg-blue-500/10">
                <Building2
                  size={24}
                  className="text-blue-400"
                />
              </div>

              <span className="text-xs text-slate-500">
                ID: {building.id}
              </span>

            </div>

            <h3 className="text-xl font-semibold mt-5">
              {building.buildingName}
            </h3>

            <div className="flex items-center gap-2 mt-3 text-slate-400">

              <Layers3 size={16} />

              <span className="text-sm">
                {building.numberOfFloors} floors
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Buildings;