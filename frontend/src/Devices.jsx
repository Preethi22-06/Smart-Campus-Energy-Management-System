import { useEffect, useState } from "react";
import { Search, Power, Cpu, Activity, Zap, CircleOff } from "lucide-react";

function Devices() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [loadingDevice, setLoadingDevice] = useState(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = () => {
    fetch("http://localhost:8080/devices")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }

        return response.json();
      })
      .then((data) => {
        setDevices(data);
      })
      .catch((error) => {
        console.error("Error fetching devices:", error);
      });
  };

  // Statistics
  const totalDevices = devices.length;

  const activeDevices = devices.filter(
    (device) => device.status === "ON"
  ).length;

  const inactiveDevices = devices.filter(
    (device) => device.status === "OFF"
  ).length;

  const activePower = devices
    .filter((device) => device.status === "ON")
    .reduce(
      (total, device) => total + (device.powerRating || 0),
      0
    );

  // Filtering
  const filteredDevices = devices.filter((device) => {
    const deviceName = device.deviceName || "";
    const deviceType = device.deviceType || "";

    const matchesSearch = deviceName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      device.status === statusFilter;

    const matchesType =
      typeFilter === "ALL" ||
      deviceType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const updateDeviceStatus = (device) => {
    const action = device.status === "ON" ? "off" : "on";

    setLoadingDevice(device.id);

    fetch(
      `http://localhost:8080/devices/${device.id}/${action}`,
      {
        method: "PUT",
      }
    )
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
  };

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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* Total */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">
                Total Devices
              </p>

              <p className="text-3xl font-semibold mt-2">
                {totalDevices}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
              <Cpu size={22} />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">
                Active Devices
              </p>

              <p className="text-3xl font-semibold mt-2 text-emerald-400">
                {activeDevices}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Activity size={22} />
            </div>
          </div>
        </div>

        {/* Inactive */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">
                Inactive Devices
              </p>

              <p className="text-3xl font-semibold mt-2 text-slate-300">
                {inactiveDevices}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-500/10 text-slate-400">
              <CircleOff size={22} />
            </div>
          </div>
        </div>

        {/* Power */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">
                Active Power
              </p>

              <p className="text-3xl font-semibold mt-2 text-yellow-400">
                {activePower} W
              </p>
            </div>

            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400">
              <Zap size={22} />
            </div>
          </div>
        </div>

      </div>

      {/* Device Panel */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl">

        {/* Search + Filters */}
        <div className="p-5 border-b border-slate-800">

          <div className="flex flex-col lg:flex-row gap-4 justify-between">

            {/* Search */}
            <div className="relative max-w-md w-full">

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

            {/* Filters */}
            <div className="flex flex-wrap gap-3">

              {/* Status */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#0b1120] border border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="ALL">
                  All Status
                </option>

                <option value="ON">
                  ON
                </option>

                <option value="OFF">
                  OFF
                </option>
              </select>

              {/* Type */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-[#0b1120] border border-slate-700 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="ALL">
                  All Types
                </option>

                <option value="LIGHT">
                  LIGHT
                </option>

                <option value="FAN">
                  FAN
                </option>
              </select>

            </div>

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

              {filteredDevices.length > 0 ? (

                filteredDevices.map((device) => (

                  <tr
                    key={device.id}
                    className="border-b border-slate-800 last:border-0 hover:bg-slate-800/40"
                  >

                    {/* Device */}
                    <td className="px-6 py-4">

                    <div
                       onClick={() => {
                               window.location.href = `/devices/${device.id}`;
                          }}
                      className="font-medium cursor-pointer hover:text-blue-400 transition"
                      >
                     {device.deviceName || "Unnamed Device"}
                         </div>

                      <div className="text-xs text-slate-500 mt-1">
                        ID: {device.id}
                      </div>

                    </td>

                    {/* Type */}
                    <td className="px-6 py-4 text-slate-300">
                      {device.deviceType || "—"}
                    </td>

                    {/* Power */}
                    <td className="px-6 py-4 text-slate-300">
                      {device.powerRating || 0} W
                    </td>

                    {/* Status */}
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

                    {/* Action */}
                    <td className="px-6 py-4 text-right">

                      <button
                        onClick={() => updateDeviceStatus(device)}
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

                ))

              ) : (

                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No devices found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Devices;