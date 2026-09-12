
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Activity,
  Power,
  Zap,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

function Reports() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = () => {
      fetch("http://localhost:8080/devices/statistics")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch statistics");
          }

          return response.json();
        })
        .then((data) => {
          setStatistics(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching statistics:", error);
          setLoading(false);
        });
    };

    fetchStatistics();

    const interval = setInterval(fetchStatistics, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white p-8">
        Loading reports...
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white p-8">
        <p className="text-red-400">
          Unable to load energy reports.
        </p>
      </div>
    );
  }

  const {
    totalDevices,
    activeDevices,
    inactiveDevices,
    activePower,
  } = statistics;

  const energyStatus =
    activePower > 300 ? "High Usage" : "Normal";

  const energyMessage =
    activePower > 300
      ? "The campus is currently consuming a high amount of power."
      : "The campus energy usage is within the expected range.";

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-8">

      {/* Back */}
      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-8"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-slate-400">
          Administrator
        </p>

        <h1 className="text-3xl font-semibold mt-1">
          Energy Reports
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor overall campus device activity and power usage.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* Total Devices */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Total Devices
            </p>

            <Activity className="text-blue-400" size={22} />
          </div>

          <h2 className="text-3xl font-semibold mt-3">
            {totalDevices}
          </h2>
        </div>

        {/* Active Devices */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Active Devices
            </p>

            <Power className="text-emerald-400" size={22} />
          </div>

          <h2 className="text-3xl font-semibold mt-3 text-emerald-400">
            {activeDevices}
          </h2>
        </div>

        {/* Inactive Devices */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Inactive Devices
            </p>

            <Power className="text-slate-400" size={22} />
          </div>

          <h2 className="text-3xl font-semibold mt-3 text-slate-400">
            {inactiveDevices}
          </h2>
        </div>

        {/* Active Power */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Active Power
            </p>

            <Zap className="text-yellow-400" size={22} />
          </div>

          <h2 className="text-3xl font-semibold mt-3 text-yellow-400">
            {Number(activePower).toFixed(2)} W
          </h2>
        </div>

      </div>

      {/* Energy Status */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">

        <p className="text-sm text-slate-400">
          Overall Energy Status
        </p>

        <div className="flex items-center gap-3 mt-4">

          {energyStatus === "High Usage" ? (
            <AlertTriangle
              size={26}
              className="text-red-400"
            />
          ) : (
            <CheckCircle
              size={26}
              className="text-emerald-400"
            />
          )}

          <h2
            className={`text-xl font-semibold ${
              energyStatus === "High Usage"
                ? "text-red-400"
                : "text-emerald-400"
            }`}
          >
            {energyStatus}
          </h2>

        </div>

        <p className="text-slate-400 mt-3">
          {energyMessage}
        </p>

      </div>

    </div>
  );
}

export default Reports;