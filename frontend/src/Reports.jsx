import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Layers3,
  DoorOpen,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

function Reports() {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      setError("");

      const response = await fetch("http://localhost:8080/buildings");

      if (!response.ok) {
        throw new Error("Failed to fetch building reports");
      }

      const data = await response.json();
      setBuildings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();

    const interval = setInterval(fetchReports, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalBuildings = buildings.length;

  const totalFloors = buildings.reduce(
    (sum, building) => sum + (building.floors?.length || 0),
    0
  );

  const totalRooms = buildings.reduce(
    (sum, building) =>
      sum +
      (building.floors || []).reduce(
        (floorSum, floor) => floorSum + (floor.rooms?.length || 0),
        0
      ),
    0
  );

  const totalDevices = buildings.reduce(
    (sum, building) =>
      sum +
      (building.floors || []).reduce(
        (floorSum, floor) =>
          floorSum +
          (floor.rooms || []).reduce(
            (roomSum, room) => roomSum + (room.devices?.length || 0),
            0
          ),
        0
      ),
    0
  );

  const totalActiveDevices = buildings.reduce(
    (sum, building) =>
      sum +
      (building.floors || []).reduce(
        (floorSum, floor) =>
          floorSum +
          (floor.rooms || []).reduce(
            (roomSum, room) =>
              roomSum +
              (room.devices || []).filter(
                (device) => device.status === "ON"
              ).length,
            0
          ),
        0
      ),
    0
  );

  const totalActivePower = buildings.reduce(
    (sum, building) =>
      sum +
      (building.floors || []).reduce(
        (floorSum, floor) =>
          floorSum +
          (floor.rooms || []).reduce(
            (roomSum, room) =>
              roomSum +
              (room.devices || [])
                .filter((device) => device.status === "ON")
                .reduce(
                  (powerSum, device) =>
                    powerSum + Number(device.powerRating || 0),
                  0
                ),
            0
          ),
        0
      ),
    0
  );

  const formatNumber = (value) => Number(value || 0).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Admin Energy Reports
            </h1>

            <p className="mt-1 text-slate-500">
              Building-wise, floor-wise, and device-wise energy monitoring
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchReports}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-slate-700 shadow hover:bg-slate-50"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white hover:bg-slate-700"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>
        </div>

        {loading && (
          <div className="rounded-xl bg-white p-6 text-center text-slate-600 shadow">
            Loading energy reports...
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-100 p-4 font-semibold text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Campus Summary */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              <div className="rounded-xl bg-white p-5 shadow">
                <Building2 className="mb-3 text-blue-600" size={28} />

                <p className="text-sm text-slate-500">Total Buildings</p>

                <h2 className="text-3xl font-bold text-slate-800">
                  {totalBuildings}
                </h2>
              </div>

              <div className="rounded-xl bg-white p-5 shadow">
                <Layers3 className="mb-3 text-purple-600" size={28} />

                <p className="text-sm text-slate-500">Total Floors</p>

                <h2 className="text-3xl font-bold text-slate-800">
                  {totalFloors}
                </h2>
              </div>

              <div className="rounded-xl bg-white p-5 shadow">
                <DoorOpen className="mb-3 text-orange-600" size={28} />

                <p className="text-sm text-slate-500">Total Rooms</p>

                <h2 className="text-3xl font-bold text-slate-800">
                  {totalRooms}
                </h2>
              </div>

              <div className="rounded-xl bg-white p-5 shadow">
                <Activity className="mb-3 text-green-600" size={28} />

                <p className="text-sm text-slate-500">Active Devices</p>

                <h2 className="text-3xl font-bold text-slate-800">
                  {totalActiveDevices}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Out of {totalDevices} devices
                </p>
              </div>

              <div className="rounded-xl bg-white p-5 shadow">
                <Zap className="mb-3 text-yellow-600" size={28} />

                <p className="text-sm text-slate-500">Active Power</p>

                <h2 className="text-3xl font-bold text-slate-800">
                  {formatNumber(totalActivePower)} W
                </h2>
              </div>
            </div>

            {/* Campus Energy Status */}
            <div className="mb-8 rounded-xl bg-white p-6 shadow">
              <div className="mb-3 flex items-center gap-3">
                {totalActivePower > 300 ? (
                  <AlertTriangle className="text-red-600" size={28} />
                ) : (
                  <CheckCircle className="text-green-600" size={28} />
                )}

                <h2 className="text-xl font-bold text-slate-800">
                  Campus Energy Status
                </h2>
              </div>

              <p
                className={`font-semibold ${
                  totalActivePower > 300
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {totalActivePower > 300
                  ? "High Usage - Please inspect active devices"
                  : "Normal - Campus energy usage is under control"}
              </p>
            </div>

            {/* Building Reports */}
            <div className="space-y-6">
              {buildings.map((building) => (
                <div
                  key={building.id}
                  className="rounded-xl bg-white p-6 shadow"
                >
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">
                        {building.buildingName ||
                          building.name ||
                          `Building ${building.id}`}
                      </h2>

                      <p className="text-sm text-slate-500">
                        Building ID: {building.id}
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                      {building.floors?.length || 0} floors
                    </span>
                  </div>

                  {building.floors?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {building.floors.map((floor) => {
                        const rooms = floor.rooms || [];

                        const devices = rooms.flatMap(
                          (room) => room.devices || []
                        );

                        const activeDevices = devices.filter(
                          (device) => device.status === "ON"
                        );

                        const activePower = activeDevices.reduce(
                          (sum, device) =>
                            sum + Number(device.powerRating || 0),
                          0
                        );

                        const highUsage = activePower > 150;

                        return (
                          <div
                            key={floor.id}
                            className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                          >
                            {/* Floor Header */}
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                              <h3 className="text-lg font-bold text-slate-800">
                                Floor {floor.floorNumber}
                              </h3>

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${
                                  highUsage
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {highUsage ? "High Usage" : "Normal"}
                              </span>
                            </div>

                            {/* Floor Statistics */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="rounded-lg bg-white p-3">
                                <p className="text-xs text-slate-500">
                                  Rooms
                                </p>

                                <p className="text-xl font-bold text-slate-800">
                                  {rooms.length}
                                </p>
                              </div>

                              <div className="rounded-lg bg-white p-3">
                                <p className="text-xs text-slate-500">
                                  Devices
                                </p>

                                <p className="text-xl font-bold text-slate-800">
                                  {devices.length}
                                </p>
                              </div>

                              <div className="rounded-lg bg-white p-3">
                                <p className="text-xs text-slate-500">
                                  Active Devices
                                </p>

                                <p className="text-xl font-bold text-green-600">
                                  {activeDevices.length}
                                </p>
                              </div>

                              <div className="rounded-lg bg-white p-3">
                                <p className="text-xs text-slate-500">
                                  Active Power
                                </p>

                                <p className="text-xl font-bold text-yellow-600">
                                  {formatNumber(activePower)} W
                                </p>
                              </div>
                            </div>

                            {/* Device Breakdown */}
                            <div className="mt-5">
                              <h4 className="mb-3 text-md font-bold text-slate-800">
                                Devices on this Floor
                              </h4>

                              {devices.length > 0 ? (
                                <div className="space-y-2">
                                  {devices.map((device) => (
                                    <div
                                      key={device.id}
                                      className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3"
                                    >
                                      <button
                                        onClick={() =>
                                          (window.location.href = `/devices/${device.id}`)
                                        }
                                        className="min-w-0 text-left"
                                      >
                                        <p className="break-words font-semibold text-blue-700 hover:underline">
                                          {device.deviceName ||
                                            `Device ${device.id}`}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                          {device.deviceType ||
                                            "Unknown Type"}
                                        </p>
                                      </button>

                                      <div className="flex flex-wrap items-center gap-3">
                                        <span className="text-sm font-semibold text-slate-600">
                                          {Number(
                                            device.powerRating || 0
                                          ).toFixed(2)}{" "}
                                          W
                                        </span>

                                        <span
                                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                                            device.status === "ON"
                                              ? "bg-green-100 text-green-700"
                                              : "bg-slate-200 text-slate-600"
                                          }`}
                                        >
                                          {device.status || "UNKNOWN"}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="rounded-lg bg-white p-3 text-sm text-slate-500">
                                  No devices available on this floor.
                                </p>
                              )}
                            </div>

                            {/* Floor Details Button */}
                            <button
                              onClick={() =>
                                (window.location.href = `/floors/${floor.id}`)
                              }
                              className="mt-4 w-full rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white hover:bg-slate-700"
                            >
                              View Floor Details
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="rounded-lg bg-slate-100 p-4 text-slate-500">
                      No floor data available for this building.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Reports;