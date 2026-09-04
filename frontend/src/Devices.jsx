import { useEffect, useState } from "react";
import { Search, Power } from "lucide-react";

function Devices() {
  const [devices, setDevices] = useState([]);
const [search, setSearch] = useState("");
const [loadingDevice, setLoadingDevice] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/devices")
      .then((response) => response.json())
      .then((data) => {
        setDevices(data);
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
      });
  }, []);

  const filteredDevices = devices.filter((device) =>
    device.deviceName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-8">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold">
          Devices
        </h2>

        <p className="text-slate-400 mt-2">
          Monitor and manage campus devices.
        </p>
      </div>

      {/* Device Panel */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl">

        {/* Search */}
        <div className="p-5 border-b border-slate-800">
          <div className="relative max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search devices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0b1120] border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
            />

          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="text-left text-sm text-slate-400 border-b border-slate-800">

                <th className="px-6 py-4 font-medium">
                  Device
                </th>

                <th className="px-6 py-4 font-medium">
                  Type
                </th>

                <th className="px-6 py-4 font-medium">
                  Power
                </th>

                <th className="px-6 py-4 font-medium">
                  Status
                </th>

                <th className="px-6 py-4 font-medium text-right">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredDevices.map((device) => (
                <tr
                  key={device.id}
                  className="border-b border-slate-800 last:border-0 hover:bg-slate-800/40"
                >

                  <td className="px-6 py-4">
                    <div className="font-medium">
                      {device.deviceName || "Unnamed Device"}
                    </div>

                    <div className="text-xs text-slate-500 mt-1">
                      ID: {device.id}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {device.deviceType || "—"}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {device.powerRating} W
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                        device.status === "ON"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          device.status === "ON"
                            ? "bg-emerald-400"
                            : "bg-slate-500"
                        }`}
                      />

                      {device.status}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-right">

   <button
  onClick={() => {
    const action = device.status === "ON" ? "off" : "on";

    setLoadingDevice(device.id);

    fetch(`http://localhost:8080/devices/${device.id}/${action}`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update device");
        }

        return response.json();
      })
      .then(() => {
        return fetch("http://localhost:8080/devices");
      })
      .then((response) => response.json())
      .then((data) => {
        setDevices(data);
      })
      .catch((error) => {
        console.error("Error updating device:", error);
      })
      .finally(() => {
        setLoadingDevice(null);
      });
  }}
  disabled={loadingDevice === device.id}
  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
    device.status === "ON"
      ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
      : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
  } ${
    loadingDevice === device.id
      ? "opacity-50 cursor-not-allowed"
      : ""
  }`}
>
  <Power size={15} />

  {loadingDevice === device.id
    ? "Updating..."
    : device.status === "ON"
      ? "Turn Off"
      : "Turn On"}
</button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Devices;