import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Cpu,
  Zap,
  Activity,
  IndianRupee,
  Power,
} from "lucide-react";

function DeviceDetails() {
  const id = window.location.pathname.split("/")[2];

  const [device, setDevice] = useState(null);
  const [energySummary, setEnergySummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const hours = 5;
  const rate = 8;

  const fetchDeviceData = () => {
    setLoading(true);

    Promise.all([
      fetch(`http://localhost:8080/devices/${id}`),
      fetch(
        `http://localhost:8080/devices/${id}/energy-summary?hours=${hours}&rate=${rate}`
      ),
    ])
      .then(async ([deviceResponse, energyResponse]) => {
        if (!deviceResponse.ok) {
          throw new Error("Failed to fetch device");
        }

        if (!energyResponse.ok) {
          throw new Error("Failed to fetch energy summary");
        }

        const deviceData = await deviceResponse.json();
        const energyData = await energyResponse.json();

        setDevice(deviceData);
        setEnergySummary(energyData);
      })
      .catch((error) => {
        console.error("Error fetching device details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDeviceData();
  }, [id]);

  const updateDeviceStatus = () => {
    if (!device) return;

    const action = device.status === "ON" ? "off" : "on";

    setLoadingStatus(true);

    fetch(`http://localhost:8080/devices/${id}/${action}`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update device status");
        }

        return response.json();
      })
      .then((updatedDevice) => {
        setDevice(updatedDevice);

        return fetch(
          `http://localhost:8080/devices/${id}/energy-summary?hours=${hours}&rate=${rate}`
        );
      })
      .then((response) => response.json())
      .then((data) => {
        setEnergySummary(data);
      })
      .catch((error) => {
        console.error("Error updating device:", error);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  };

  const goBack = () => {
    window.location.href = "/devices";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white p-8">
        <p className="text-slate-400">
          Loading device details...
        </p>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white p-8">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6"
        >
          <ArrowLeft size={18} />
          Back to Devices
        </button>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">
          <h2 className="text-xl font-semibold">
            Device not found
          </h2>

          <p className="text-slate-400 mt-2">
            The requested device could not be found.
          </p>
        </div>
      </div>
    );
  }

  const energy =
    energySummary?.energy ??
    energySummary?.energyConsumption ??
    0;

  const estimatedCost =
    energySummary?.estimatedCost ??
    energySummary?.cost ??
    0;

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-8">

      {/* Back */}
      <button
        onClick={goBack}
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition"
      >
        <ArrowLeft size={18} />
        Back to Devices
      </button>

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold">
          {device.deviceName || "Unnamed Device"}
        </h2>

        <p className="text-slate-400 mt-2">
          Device details and energy monitoring.
        </p>
      </div>

      {/* Device Information */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 mb-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div className="flex items-center gap-4">

            <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400">
              <Cpu size={28} />
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                {device.deviceName || "Unnamed Device"}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Device ID: {device.id}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4">

            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                device.status === "ON"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-slate-500/10 text-slate-400"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  device.status === "ON"
                    ? "bg-emerald-400"
                    : "bg-slate-500"
                }`}
              />

              {device.status}
            </span>

            <button
              onClick={updateDeviceStatus}
              disabled={loadingStatus}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
                device.status === "ON"
                  ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
              } ${
                loadingStatus
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <Power size={16} />

              {loadingStatus
                ? "Updating..."
                : device.status === "ON"
                  ? "Turn Off"
                  : "Turn On"}
            </button>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Type */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Device Type
              </p>

              <p className="text-2xl font-semibold mt-2">
                {device.deviceType || "—"}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
              <Cpu size={22} />
            </div>

          </div>
        </div>

        {/* Power */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Power Rating
              </p>

              <p className="text-2xl font-semibold mt-2">
                {device.powerRating || 0} W
              </p>
            </div>

            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400">
              <Zap size={22} />
            </div>

          </div>
        </div>

        {/* Energy */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Energy Consumption
              </p>

              <p className="text-2xl font-semibold mt-2">
                {Number(energy).toFixed(2)} kWh
              </p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Activity size={22} />
            </div>

          </div>
        </div>

        {/* Cost */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Estimated Cost
              </p>

              <p className="text-2xl font-semibold mt-2">
                ₹{Number(estimatedCost).toFixed(2)}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <IndianRupee size={22} />
            </div>

          </div>
        </div>

      </div>

      {/* Monitoring Information */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 mt-6">

        <h3 className="text-lg font-semibold mb-5">
          Energy Monitoring
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-[#0b1120] rounded-xl p-4">
            <p className="text-sm text-slate-400">
              Monitoring Period
            </p>

            <p className="text-lg font-semibold mt-2">
              {hours} hours
            </p>
          </div>

          <div className="bg-[#0b1120] rounded-xl p-4">
            <p className="text-sm text-slate-400">
              Electricity Rate
            </p>

            <p className="text-lg font-semibold mt-2">
              ₹{rate} / kWh
            </p>
          </div>

          <div className="bg-[#0b1120] rounded-xl p-4">
            <p className="text-sm text-slate-400">
              Current Status
            </p>

            <p
              className={`text-lg font-semibold mt-2 ${
                device.status === "ON"
                  ? "text-emerald-400"
                  : "text-slate-400"
              }`}
            >
              {device.status}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default DeviceDetails;